import React from 'react'
import './Tree.css'
import * as d3 from "d3"
import axios from 'axios'

export default class Tree extends React.Component{
	constructor(props){
		super(props)
		console.log("tree props", this.props.family)
		this.state = {
			tree: {}
		}
	}
	componentWillMount(){
		axios.get('http://localhost:3000/api/v1/tree').then(response => {
			// console.log(response)
			this.setState({tree: response.data})
			console.log("this is tree", this.state.tree)
			this.createTree(this.state.tree)

		}).catch(error => console.log(error))
		console.log("this is the tree", this.state.tree)
	}

	createTree(family){
		const svg = d3.select('body').append('svg')
		
		// const width = document.body.clientWidth
		// const height = document.body.clientHeight
		console.log("this is what I have for fam", family)
		const width = 500
		const height = 500
		const margin = { top: 50, right: 60, bottom: 50, left: 50};
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;
		const root = d3.hierarchy(family)
		const myTree = d3.tree()
			.size([innerHeight, innerWidth])
		
		const zoomG = svg.attr('width', width).attr('height', height)
						.append('g')
						
		const g = zoomG.append('g')
						.attr('transform', `translate(${margin.left}, ${margin.right})`)
			
		svg.call(d3.zoom().on('zoom', () =>{
			zoomG.attr('transform', d3.event.transform)
		}))
		
		const links = myTree(root).links()
		const linkPathGenerator = d3.linkHorizontal()
			.x(d => d.y)
			.y(d => d.x)
		g.selectAll('path').data(links)
			.enter().append('path')
			.attr('d', linkPathGenerator)
		
		g.selectAll('text').data(root.descendants())
			.enter().append('text')
				.attr('x', d=> d.y)
				.attr('y', d=> d.x)
				.attr('dy', '0.32em')
		        .attr('text-anchor', d=> d.children ? 'middle' : 'start')
		        .attr('font-size', d => 3.25 - d.depth + 'em')
				.text(d => d.data.name)
	}
	render(){
		return(
			<div className= "col">
				
			</div>
		)
		
	}
}