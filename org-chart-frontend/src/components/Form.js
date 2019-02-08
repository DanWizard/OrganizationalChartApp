import React from 'react';
import './Form.css';

class Form extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			step: 0
		}
	}

	changeContent(props){
		if(props.step == 0){
			this.setState({step: props.step + 1})
			return
		}
		if (props.step == 1){
			this.setState({step: props.step + 1})
			return
		}
	}

	render(){
		const status = this.state.step
		let content
			if (status == 0) {
				content= <div className="start-button">
					<button className="btn justify-content-center" onClick={() => this.changeContent(this.state)}>Get Started</button>
				</div>
				
			}
			if (status == 1) {
					content = <form>
						<h1 className="form-title text-center">Add First Set </h1>
						<div className="form-row">
							<div className="col form-group">
								<label for = "InputFirstName">First Name</label>
								<input type="text" className="form-control" id = "InputFirstName" placeholder = "First Name"/>
							</div>
							<div className="col form-group">
								<label for = "InputLastName">Last Name</label>
								<input type="text" className="form-control" id = "InputLastName" placeholder = "Last Name"/>
							</div>
						</div>
						<div className="form-row">
							<div className="col form-group">
								<label for = "InputEmail">Email</label>
								<input type="email" className="form-control" id = "InputEmail" placeholder = "Email"/>
							</div>
						</div>
						<div className="form-row">
							<div className="col form-group">
								<label for = "InputTitle">Title</label>
								<input type="text" className="form-control" id = "InputTitle" placeholder = "Title"/>
							</div>
						</div>
						<button className=" btn begin-button" onClick={() => this.changeContent(this.state)}>Begin</button>
					</form>
			}
			if (status == 2) {
				content = null
			}


		return(
			<div className="container">
				{content}
			</div>
			
			
		)
	}
}

export default Form