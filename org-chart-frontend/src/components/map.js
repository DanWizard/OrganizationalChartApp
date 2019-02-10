import React from 'react';
import './Map.css';
import Form from "./Form"
import Cell from "./Cell"
import axios from 'axios'
import orgchart from 'orgchart'

class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			cells: [],
			tree: {}
		}

	}

	componentDidMount(){
		axios.get('http://localhost:3000/api/v1/members').then(response => {
			this.setState({cells: response.data})
			console.log(response.data[0].name)
			if(response.data.length >= 1){
				console.log('hello')
				this.structureTree()
			}
		})
		.catch(error => console.log(error))

	}
	

	findRoot(){
		let data = this.state.cells 
		let root
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].manager_id == null){
				root = data[i]
			}
		}
		console.log(root)
		return root
	}

	findChildren(parent_, tree = []){
		if (parent_) {
			let row = {
				parent: parent_,
				children: []
			}
			let id = parent_.id.toString()
			axios.get('http://localhost:3000/api/v1/members/'+id+'/children').then(response => {
				if(response.data.length >= 1){
					row.children.push(response.data)
					tree.push(row)
					for (var i = response.data.length - 1; i >= 0; i--) {
						return this.findChildren(response.data[i], tree)
					}
				}
			})
			.catch(error => console.log(error))
		}
		return tree
	}

	structureTree(){
		let start = this.findRoot()
		let oak = this.findChildren(start)
		console.log("Tree Results", oak)
		this.setState({tree: oak})
		return oak
	}

	render(){
		
		
		let num = 1
		return(
			<div>
			    
				<div className="container map">
					{this.state.cells.map((cell) => {
						return(
							<Cell id={cell.id} firstName={cell.name} title_={cell.title}/>
						)
					})}
				</div>
				<Form />
			</div>
		)
	}
}

export default Map