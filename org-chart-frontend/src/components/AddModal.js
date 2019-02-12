import React from 'react'
import './Modal.css'


class Modal extends React.Component{
	constructor(props){
		super(props)
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
					<h1 className="form-title text-center">Create Member</h1>
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
							{managerList}
						</div>
					</div>
					<button type='button' className=" btn begin-button" onClick={ () => this.props.added(this.props.info)} >Create</button>
				</div>
			</div>		
		</div>
		// <div>

		// 	<h1>Goodbye</h1>
		// </div>
		)
	}
}

export default Modal