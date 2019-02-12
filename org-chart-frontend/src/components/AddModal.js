import React from 'react'

import axios from 'axios'
import update from 'immutability-helper'		


class AddModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: '',
			title: '',
			manager: ''
		}
	}
	hanldeSubmit = () => {
		axios.get('http')
	}
	createUser(props){
		const member = {title: this.s}
		axios.post('http://localhost:3000/api/v1/members', {'member':{'name': 'Will', 'title': 'Tech Lead', 'manager_id': 1}}).then(response => {

			console.log(response)
			this.props.added(response.data)
			// const members = update(this.state.members, { $splice: [[0,0, response.data]]})
			// this.props.added(members)
			// this.setState({members: members})
			// console.log(this.state.member)
		})
		.catch(error => console.log(error))
		props.add = false
		this.setState({add: props.add})
		this.props.added(this.props.info)
		return
	}

	handleInput = (e) => {this.setState({[e.target.name]: e.target.value})}
	render(){
		let managerList
		if (this.props.info.members.length > 1){
			managerList = <select value={this.setState.manager} onChange={this.handleInput} className='form-control' id='SelectManager'>
							{this.props.info.members.map(member => {
								return(
									<option value = {member.id}>{member.name} - {member.title}</option>
								)
							})}
							</select>
		}
		if (this.props.info.members.length < 1) {
			managerList = null
		}
		return(
		<div className=''>
		// 	<div className = 'main'>
		// 		<div className = 'add-user'>
		// 			<h1 className="form-title text-center">Create Member</h1>
		// 			<form OnSubmit={this.hanldeSubmit}>
		// 				<div className="form-row">
		// 					<div className="col form-group">
		// 						<label for = "InputName">Name</label>
		// 						<input value={this.state.name} onChange={this.handleInput} name="name" type="text" className="form-control" id = "InputName" placeholder = "Name"/>
		// 					</div>
		// 					<div className="col form-group">
		// 						<label for = "InputLastName">Title</label>
		// 						<input value={this.state.title} onChange={this.handleInput} name="last_name" type="text" className="form-control" id = "InputTitle" placeholder = "Title"/>
		// 					</div>
		// 				</div>
		// 				<div className="form-row">
		// 					<div className="col form-group">
		// 						{managerList}
		// 					</div>
		// 				</div>
		// 				<button type='button' className=" btn begin-button" onClick={ this.createUser(this.props.info)} >Create</button>
		// 			</form>
		// 		</div>
		// 	</div>		
		// </div>
		// <div>

		// 	<h1>Goodbye</h1>
		
		)
	}
}

export default AddModal