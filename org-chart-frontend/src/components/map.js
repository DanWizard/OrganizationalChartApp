import React from 'react';
import './Map.css';
import Cell from "./Cell"
import axios from 'axios'
import update from 'immutability-helper'
import Tree from './Tree'


class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			members: [],
			initialTree: {},
			tree:'hello',
			add: false,
			member: {},
			editingMemberId: null,
			manager: '',
			children: {},
			showManager: {},
			manager_id : '',
			updateMember: {},
			createMember: {},
			createformValid: true,
			updateformValid: true,
			NameValid: true,
			TitleValid:true,
			formErrors: {name:'',title:''},
			name:'',
			title:'',
			updateName: "",
			updateTitle: ""


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
		axios.get('http://localhost:3000/api/v1/tree').then(response => {
			// console.log(response)
			let tree_stuff = update(this.state.initialTree, {$set: response.data})
			this.setState({initialTree: tree_stuff})
			console.log("this is tree", this.state.initialTree)
			this.structureData(this.state.initialTree)
		}).catch(error => console.log(error))
		console.log("this is the tree", this.state.tree)
	}
	
	structureData(treeData){
		this.setState({tree:treeData})
		console.log("got struc", this.state.tree)
	}

	addContent(props){
		const reset = ''
		this.setState({member: reset})
		if(this.state.members.length == 0){
			// console.log('set to null')
			let temp = null
			this.setState({manager_id: temp })
			// console.log(this.state.manager_id)
		}
		if (this.state.members.length >= 1) {
			// console.log('set to first')
			let temp = this.state.members[0].id
			this.setState({manager_id:temp})
			}
		if(props.add){
			// console.log('set to false')
			props.add = false
			this.setState({add: props.add})
			return
		}
		if (!props.add){
			// console.log('set to true')
			props.add = true
			this.setState({add: props.add})
			return
		}
	}
	

	addUser(props){
		// console.log('enter request')
		// console.log(this.state.manager_id)
		let num = parseInt(this.state.createMember)
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
			this.setState({createformValid: true,})
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
			let manager = response.data.manager_id
			// console.log(manager) 
			let man = update(this.state.manager_id, {$set: response.data.manager_id})
			// console.log(man)	
			this.setState({member: mem})
			this.setState({manager_id: man})
			// console.log(this.state.manager_id)

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

		// console.log(this.state.manager_id)
		// console.log(this.state.manager_id)
		// console.log(this.state.manager_id)
		this.goBackUpdate()
	}

	goBackUpdate(){

		const reset = ''
		this.setState({member: reset})
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
		if(this.state.update){
			// console.log('set to false')
			let update = false
			this.setState({update: update})
			return
		}
		if (!this.state.update){
			// console.log('set to true')
			let update = true
			this.setState({update: update})
			return
		}
	}

	deleteMember = (id) => {
		let rt = id.toString()
		axios.delete('http://localhost:3000/api/v1/members/'+rt).then(response => {
			// console.log(response)
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

	validateCreateForm (){
		if(this.state.name.length > 2 && this.state.title.length > 2){
			this.setState({createformValid: false})
		}
		if(this.state.name.length <= 2 || this.state.title.length <= 2){
			this.setState({createformValid: true})
		}
		
	}

	validateUpdateForm (){
		if(this.state.updateName.length > 2 && this.state.updateTitle.length > 2){
			this.setState({updateformValid: false})
		}
		if(this.state.updateName.length <= 2 || this.state.updateTitle.length <= 2){
			this.setState({updateformValid: true})
		}
		
	}

	handleInputCreate = (e) => {this.setState({[e.target.name]: e.target.value}, this.validateCreateForm)}
	handleInputUpdate = (e) => {this.setState({[e.target.name]: e.target.value}, this.validateUpdateForm)}
		
	handleUpdate = (m) =>{
		// console.log(m)
		let rt = m.id.toString()
		let num = parseInt(this.state.updateMember)
		const member = {'name': this.state.updateName, 'title': this.state.updateTitle, 'manager_id': num}
		axios.put('http://localhost:3000/api/v1/members/'+rt, {"member":member}).then(response => {
			console.log(response)
			let updated_id = response.data.id
			const reset = ''
			const memberIndex =this.state.members.findIndex(x=>x.id === updated_id)
			let c = update(this.state.members, {[memberIndex]: {$set: response.data }})
			this.setState({updateName: reset})
			this.setState({updateTitle: reset	})
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
			this.setState({name: reset})
			this.setState({title: reset	})
			this.setState({members: c})
		}).catch(error => console.log(error))
		this.goBackUpdate()
	} 

	render(){
		// console.log(this.state.member)
		const memberManager = this.state.showManager
		const memberChildren = this.state.children
		// console.log(memberManager)
		// console.log(memberChildren)
		const treeData = this.state.tree
		const amountOfMembers = this.state.members.length
		const addStatus = this.state.add
		const updateStatus = this.state.update
		let addModal, updateModal, managerListUpdate, managerListCreate, manager, children  

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
			// console.log('showManager')
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
			managerListUpdate = 
			<div className="col form-group">
				<label for = "SelectManager">Manager</label>
				<select name ="updateMember" onChange={this.handleInputUpdate} className='form-control' id='SelectManager'>
					<option value='' >none</option>
					{this.state.members.map(member => {

						if (!member.manager_id && member.manager_id === this.state.member.id || member.id == this.state.member.id) {
							console.log('samam')
							console.log('samam')
							console.log('samam')
							console.log('samam')
							return(
								<p id="hidethis"></p>
							) 	
						}
						if(member.manager_id != this.state.member.id){
							console.log('samam')
							console.log('samam')
							console.log('samam')
							console.log('s1amam')
							return(
								<option value = {member.id}>{member.name} - {member.title}</option>
							)
						}
						
						if (!member.manager_id && member.manager_id != this.state.member.id){
							return(
								<option value = {member.id}>{member.name} - {member.title}</option>
							)
							
						}
						
					})}
				</select>
			</div>
			managerListCreate = 
			<div className="col form-group">
				<label for = "SelectManager">Manager</label>
				<select name ="createMember" onChange={this.handleInputCreate} className='form-control' id='SelectManager'>
					<option value='' >none</option>
					{this.state.members.map(member => {


						if(member.manager_id != this.state.manager_id){
							return(
								<option value = {member.id}>{member.name} - {member.title}</option>
							)
						}
						if (!member.manager_id && member.manager_id === this.state.manager_id) {
							return(
								<p id="hidethis"></p>
							) 	
						}
						if (!member.manager_id && member.manager_id != this.state.manager_id){
							return(
								<option value= {member.id}>{member.name} - {member.title}</option>
							)
							
						}
						
					})}
				</select>
			</div>
		}
		if (amountOfMembers < 1) {
			managerListUpdate = null
			managerListCreate = null

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
								<input  value = {this.state.updateName} onChange={this.handleInputUpdate} name="updateName" type="text" className="form-control" id = "InputName" placeholder = {this.state.member.name}/>
							</div>
							<div className="col form-group">
								<label for = "InputLastName">Title</label>
								<input name="updateTitle"  value = {this.state.updateTitle} onChange={this.handleInputUpdate} type="text" className="form-control" id = "InputTitle" placeholder = {this.state.member.title}/>
							</div>
						</div>
						<div className="form-row">
								{managerListUpdate}
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
								<button type='button' className=" btn begin-button" onClick={ () => this.handleUpdate(this.state.member)} disabled={this.state.updateformValid} >Update</button>
							</div>
						</div>
					</form>
					
				</div>
			</div>		
		</div>
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
										<input value={this.state.name} onChange={this.handleInputCreate} name="name" type="text" className="form-control" id = "InputName" placeholder = "Name"/>
									</div>
									<div className="col form-group">
										<label for = "InputLastName">Title</label>
										<input value={this.state.title} onChange={this.handleInputCreate} name="title" type="text" className="form-control" id = "InputTitle" placeholder = "Title"/>
									</div>
								</div>
								<div className="form-row">
									{managerListCreate}
								</div>
								<div className='form-row'>
									<div className = 'col form-group'>
										<i className = "fa fa-caret-left"></i>
										<button type='button' className=" btn back-button" onClick={ () => this.addContent(this.state)} >Back</button>
									</div>
									<div className = 'col form-group'>
										<button type='button' className=" btn begin-button" onClick={ () => this.addUser(this.state)} disabled={this.state.createformValid}>Create</button>
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
			    <h3 className="text-center subtitle">Members</h3>
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
				<h3 className="text-center subtitle"> Relationships</h3>
				<div className row>
					<Tree family = {treeData}/>
				</div>
			</div>
		)
	}
}

export default Map