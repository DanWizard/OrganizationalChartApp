import React from 'react'

import axios from 'axios'


class UpdateModal extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		// let id = this.props.info.member.id.toString()
		// console.log(this.props.info.member)
		// axios.get('http://localhost:3000/api/v1/members).then(response => {
		// 	this.setState({members: response.data})
		// 	if(response.data.length >= 1){
		// 		this.structureTree()
		// 	}
		// })
		// .catch(error => console.log(error))
	}

	render(){
		let managerList
		if (this.props.info.members.length > 1){
			managerList = <select className='form-control' id='SelectManager'>
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
		<div className='mod'>
			<div className = 'main'>
				<div className = 'add-user'>
					<h1 className="form-title text-center">Member's Info</h1>
					<div className="form-row">
						<div className="col form-group">
							<label for = "InputName">Name</label>
							<input name="name" type="text" className="form-control" id = "InputName" placeholder = "Name"/>
						</div>
						<div className="col form-group">
							<label for = "InputLastName">Title</label>
							<input name="last_name" type="text" className="form-control" id = "InputTitle" placeholder = "Title"/>
						</div>
					</div>
					<div className="form-row">
						<div className="col form-group">
							<label for = "SelectManager">Manager</label>
							{managerList}
						</div>
					</div>
					<button type='button' className=" btn begin-button" onClick={ () => this.props.updated(this.props.info)} >Update</button>
				</div>
			</div>		
		</div>
		// <div>

		// 	<h1>Goodbye</h1>
		// </div>
		)
	}
}

export default UpdateModal