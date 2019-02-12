import React from 'react';
import './Map.css';
import Form from "./Form"
import Cell from "./Cell"
import axios from 'axios'
import * as d3 from "d3"
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import update from 'immutability-helper'


class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			members: [],
			tree: {},
			add: false,
			update: false,
			member: {},
			editingMemberId: null,
			manager: '',
			children: {},
			showManager: {},
			manager_id : ''

		}

	}

	componentDidMount(){
		axios.get('http://localhost:3000/api/v1/members').then(response => {
			this.setState({members: response.data})
			if(response.data.length >= 1){
				const first_member_id = response.data[0].id
				this.setState({manager_id: first_member_id})
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
	// 				let datum = setInterval(this.findChildren(response.data[i]), 5000)
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

	addContent(props){
		if(props.add){
			console.log('set to false')
			props.add = false
			this.setState({add: props.add})
			return
		}
		if (!props.add){
			console.log('set to true')
			props.add = true
			this.setState({add: props.add})
			return
		}
	}
	

	addUser(props){
		// console.log('enter request')
		// console.log(this.state.manager_id)
		let num = parseInt(this.state.manager_id)
		const member = {'name': this.state.name, 'title': this.state.title, 'manager_id': num}
		axios.post('http://localhost:3000/api/v1/members', {'member':member}).then(response => {
			// console.log(response.data)
			const members = update(this.state.members, { $splice: [[0,0, response.data]]})
			const reset = ''
			const recent_member_id = response.data.id
			this.setState({name: reset})
			this.setState({title: reset	})
			this.setState({members: members})
			this.setState({manager_id: recent_member_id})
			// console.log(this.state.member)
		})
		.catch(error => console.log(error))
		props.add = false
		this.setState({add: props.add})
		return
	}

	updateUser(props){
		props.update = false
		this.setState({update: props.update})
		return
	}

	updateContent = (id) => {
		let rt = id.toString()
		axios.get('http://localhost:3000/api/v1/members/'+rt).then(response => {
			let mem = update(this.state.member, {$set: response.data})
			this.setState({member: mem})
		})
		.catch(error => console.log(error))

		axios.get('http://localhost:3000/api/v1/members/'+rt+'/children').then(response => {
			let c = update(this.state.children, {$set: response.data})
			this.setState({children: c})
		})

		axios.get('http://localhost:3000/api/v1/members/'+rt+'/manager').then(response => {
			let m = update(this.state.showManager, {$set: response.data})
			this.setState({showManager: m})
		})
		.catch(error => console.log(error))
		this.goBackUpdate()
	}

	goBackUpdate(){
		if(this.state.update){
			console.log('set to false')
			let update = false
			this.setState({update: update})
			return
		}
		if (!this.state.update){
			console.log('set to true')
			let update = true
			this.setState({update: update})
			return
		}
	}

	deleteMember = (id) => {
		let rt = id.toString()
		axios.delete('http://localhost:3000/api/v1/members/'+rt).then(response => {
			console.log(response)
			const memberIndex = this.state.members.findIndex(x => x.id === id)
			const members = update(this.state.members, { $splice: [[memberIndex, 1]]})
			this.setState({members: members})

			// const first_member_id = this.state.members[0].id
			console.log(this.state.members.length)
			if(this.state.members.length == 0){
				// console.log('set to null')
				let temp = null
				this.setState({manager_id: temp })
				console.log(this.state.manager_id)
			}
			if (this.state.members.length >= 1) {
				// console.log('set to first')
				let temp = this.state.members[0].id
				this.setState({manager_id:temp})
			}
			// this.setState({member_id: first_member_id})
		})
		.catch(error => console.log(error))

	}

	handleInput = (e) => {this.setState({[e.target.name]: e.target.value})}
	handleUpdate = (m) =>{
		console.log(m)
		let rt = m.id.toString()
		let num = parseInt(this.state.manager_id)
		const member = {'name': this.state.name, 'title': this.state.title, 'manager_id': num}
		axios.put('http://localhost:3000/api/v1/members/'+rt, {"member":member}).then(response => {
		console.log(response)
		}).catch(error => console.log(error))
		this.goBackUpdate()
	} 

	render(){
		// console.log(this.state.member)
		const memberManager = this.state.showManager
		const memberChildren = this.state.children
		// console.log(memberManager)
		// console.log(memberChildren)
		const memberInfo = this.state.member
		const amountOfMembers = this.state.members.length
		const addStatus = this.state.add
		const updateStatus = this.state.update
		let addModal, updateModal, managerList, manager, children  

		if(memberManager){
			manager = 
			<div className= 'col form-group'id="mans">
				<p>{this.state.showManager.name} - {this.state.showManager.title}</p>
			</div>
		}

		if(!memberManager){
			manager = 
			<div className= 'col form-group' id="mans">
				<p>none</p>
			</div>
		}

		if(memberChildren && memberChildren.length >= 1){
			console.log('showManager')
			children = 
			<div className = 'col form-group subs' id="subs">
				
				{this.state.children.map(child => {
					return(
						<p>{child.name} - {child.title}</p>
					)
				})}
			</div>
		}

		if(!memberChildren || memberChildren.length == 0){
			children = 
			<div className= 'col form-group' id="subs">
				<p>none</p>
			</div>

			
		}



		if (amountOfMembers >= 1){
			managerList = 
			<div className="col form-group">
				<label for = "SelectManager">Manager</label>
				<select name ="manager_id" onChange={this.handleInput} className='form-control' id='SelectManager'>
								{this.state.members.map(member => {
									return(
										<option value = {member.id}>{member.name} - {member.title}</option>
									)
								})}
				</select>
			</div>
		}
		if (amountOfMembers < 1) {
			managerList = null
		}
		
		if (updateStatus) {
			updateModal = <div className='mod'>
			<div className = 'main'>
				<div className = 'add-mo'>
					<form onSubmit={this.handleUpdate}>
						<h1 className="form-title text-center">{this.state.member.name}'s Info</h1>
						<div className="form-row">
							<div className="col form-group">
								<label for = "InputName">Name</label>
								<input value = {this.state.name} onChange={this.handleInput} name="name" type="text" className="form-control" id = "InputName" placeholder = {this.state.member.name}/>
							</div>
							<div className="col form-group">
								<label for = "InputLastName">Title</label>
								<input name="title" value = {this.state.title} onChange={this.handleInput} type="text" className="form-control" id = "InputTitle" placeholder = {this.state.member.title}/>
							</div>
						</div>
						<div className="form-row">
								{managerList}
						</div>
						<div className = "form-row">
							<div className= "col form-group">
								<label for="mans">Manager</label>
								{manager}
							</div>
							<div className="col form-group">
								<label for="subs">Subordinates</label>
								{children}
							</div>
						</div>						
						<div className='form-row'>
							<div className = 'col form-group'>
								<i className = "fa fa-caret-left"></i>
								<button type='button' className=" btn back-button" onClick={ () => this.goBackUpdate()} >Back</button>
							</div>
							<div className = 'col form-group'>
								<button type='button' className=" btn begin-button" onClick={ () => this.handleUpdate(this.state.member)} >Update</button>
							</div>
						</div>
					</form>
					
				</div>
			</div>		
		</div>
			// updateModal = <UpdateModal info = {this.state} updated={ (info) => this.updateUser(info)}/>
		}

		if (!updateStatus) {
			updateModal = null
		}


		if (addStatus){
			console.log("show form")
			addModal= <div className = "mod">
						<div className = 'main'>
							<div className = 'add-mo'>
							<h1 className="form-title text-center">Create Member</h1>
							<form>
								<div className="form-row">
									<div className="col form-group">
										<label for = "InputName">Name</label>
										<input value={this.state.name} onChange={this.handleInput} name="name" type="text" className="form-control" id = "InputName" placeholder = "Name"/>
									</div>
									<div className="col form-group">
										<label for = "InputLastName">Title</label>
										<input value={this.state.title} onChange={this.handleInput} name="title" type="text" className="form-control" id = "InputTitle" placeholder = "Title"/>
									</div>
								</div>
								<div className="form-row">
									{managerList}
								</div>
								<div className='form-row'>
									<div className = 'col form-group'>
										<i className = "fa fa-caret-left"></i>
										<button type='button' className=" btn back-button" onClick={ () => this.addContent(this.state)} >Back</button>
									</div>
									<div className = 'col form-group'>
										<button type='button' className=" btn begin-button" onClick={ () => this.addUser(this.state)} >Create</button>
									</div>
								</div>								
							</form>
							<div className = "row">
								
								
							</div>
							</div>
						</div>
					</div>
		}

		if (!addStatus){
			addModal = null
		}



		let num = 1
		return(
			
			<div>
				{updateModal}
				{addModal}
			    <h3 className="text-center subtitle">Your Organization</h3>
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
							<Cell key = {member.id} member = {member} onUpdate ={ this.updateContent } onDelete={this.deleteMember}/>
							)		
						})}
						
					</table>
				</div>
				<div className="start-button">
					<button className="btn justify-content-center box-shadow--6dp" onClick={() => this.addContent(this.state)}>Add Member</button>
				</div>
				<h3 className="text-center subtitle"> Organization Tree</h3>
			</div>
		)
	}
}

export default Map