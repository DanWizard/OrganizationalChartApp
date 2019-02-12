import React from 'react';
import axios from 'axios';

class Form extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
	}

	changeContent(props){
		if(props.step == 0){
			this.setState({step: props.step + 1})
			return
		}
		if (props.step == 1){
			axios.post('http://localhost:3000/api/v1/members',{member: {name: 'mark', title: 'CTO', manager_id: 3}})
			.then(response => {
				
				console.log(response)
			})
			.catch(error => console.log(error))

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
					content = <div>
						<h1 className="form-title text-center">Add First Cell </h1>
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
						<button type='button' className=" btn begin-button" onClick={() => this.changeContent(this.state)}>Begin</button>
					</div>
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