import React from 'react';
import './Map.css';
import Form from "./Form"
import Cell from "./Cell"
import axios from 'axios'
import * as d3 from "d3"
import Modal from './Modal'


class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			members: [],
			tree: {},
			add: false,
			step: false
		}

	}

	componentDidMount(){
		axios.get('http://localhost:3000/api/v1/members').then(response => {
			this.setState({members: response.data})
			if(response.data.length >= 1){
				// this.structureTree()
			}
		})
		.catch(error => console.log(error))

	}
	

	// findRoot(){
	// 	let data = this.state.members 
	// 	let root
	// 	for (var i = data.length - 1; i >= 0; i--) {
	// 		if(data[i].manager_id == null){
	// 			root = data[i]
	// 		}
	// 	}
	// 	// console.log(root)
	// 	return root
	// }

	// findChildren(parent_){
	// 		// console.log(parent_)
	// 		let id = parent_.id.toString();
	// 		axios.get('http://localhost:3000/api/v1/members/'+id+'/children').then(response => {
	// 			// console.log('enter')
	// 			if (response.data.length >= 1){
	// 			let treeObj = {
	// 				'name' : '',
	// 				'children': []
	// 			};
	// 			treeObj['name'] = parent_.name;
	// 			let set = [];
	// 			// console.log(treeObj);

	// 			let child = response.data;
	// 			for(let i in response.data){
	// 				// console.log(response.data[i])
	// 				let datum = this.findChildren(response.data[i])
	// 				// console.log(datum)
	// 				set.push(datum)
	// 			}
	// 			// child.map((person) =>{(
	// 			// 		// let datum = this.findChildren(person)
	// 			// 		// console.log(datum)
	// 			// 		// set.push(datum)
	// 			// 		set.push(this.findChildren(person))
	// 			// 	)
	// 			// });
	// 			// console.log(set);
	// 			treeObj['children'] = set;
 //    			console.log("with children", treeObj);
 //    			return treeObj;
 //    		}
 //    		else{
 //    			let treeObj = {
 //    				'name': ''
 //    			};
 //    			treeObj['name'] = parent_['name'];
 //    			console.log("without children", treeObj)
 //    			return treeObj;
 //    		}
				
	// 		})
	// 		.catch(error => console.log(error))
 //    }


	// structureTree(){
		
	// 	let start = this.findRoot()
	// 	this.setState({tree: start})
	// 	let seed = this.findChildren(this.state.tree)
	// 	// let sapling = this.sproutTree(seed)
	// 	// let sapling = this.changeFormat(l)
	// 	// console.log("sap result", sapling)
	// 	console.log("Tree Results", seed)
	// 	this.setState({tree: seed})
	// 	return seed
	// }

	changeContent(props){
		if(props.step){
			console.log('set to false')
			props.step = false
			this.setState({step: props.step})
			return
		}
		if (!props.step){
			console.log('set to true')
			props.step = true
			this.setState({step: props.step})
			return
		}
	}

	addUser(props){
		props.step = false
		this.setState({step: props.step})
		return
	}


	render(){
		const status = this.state.step
		let addModal
		console.log(status)
		if (status){
			console.log("show form")
			 addModal =<Modal info = {this.state} added ={ (info) => this.addUser(info)}/>

		}

		if (!status){

			addModal = null
		}



		let num = 1
		return(
			
			<div>
				{addModal}
			    <div className="start-button">
					<button className="btn justify-content-center" onClick={() => this.changeContent(this.state)}>Add Member</button>
				</div>
				<div className="container map">
					<table className="table table-hover table-bordered box-shadow--6dp">
					<thead>
						<tr className= ''>
							<th scope = 'col' className='text-center'>
								Name
							</th>
							<th scope ='col' className='text-center'>
								Title
							</th>
							<th scope = 'col' className='text-center actions'>
								Actions
							</th>
						</tr>
					</thead>
						{this.state.members.map((member) => {
						return(
							<tr className= ''>
								<td className='text-center'>
								{member.name}
								</td>
								<td className='text-center'>
								{member.title}
								</td>
								<td className='text-center'>
									<button className='btn user'>
									<i className='fa fa-user'></i>
								 	</button>
									<button className='btn delete'>
									<i className='fa fa-close'></i>
								 	</button>
								</td>
							</tr>
							)		
						})}
						
					</table>
				</div>
				
			</div>
		)
	}
}

export default Map