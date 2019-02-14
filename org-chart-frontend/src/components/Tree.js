import React from 'react'
import './Tree.css'
import * as d3 from "d3"
import axios from 'axios'
import ReactDOM from 'react-dom';

export default class Tree extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			tree: {},
            height: window.innerHeight, 
            width: window.innerWidth
    	};
	}
	
	componentDidUpdate(prevProps){
		console.log('count')
		d3.select("body").selectAll("svg").remove();
		console.log(typeof this.props.family)
		if(prevProps.family != this.props.family && typeof this.props.family == 'object')
		d3.select("body").selectAll("svg").remove();
		this.createTree(this.props.family)
	}

	// getSVG(){
	// 	// ReactDOM.unmountComponentAtNode(document.getElementById('tree_svg'));
	// 	d3.select("body").selectAll("svg").remove();
	// }
	createTree(family){
		const svg = d3.select('body').append('svg').attr("id", "tree_svg")
		

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
		        .attr('font-size', d => 1.5+"em")
				.text(d => d.data.name)
	}
	render(){
		return(
			<div className= "col">
				<p className= "text-center t">only supported on desktop and tablet... for now ( ◠‿◠)</p>
			</div>
		)
		
	}
}