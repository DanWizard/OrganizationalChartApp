import React from 'react';
import './Cell.css';
import axios from 'axios'

class Cell extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			manager : null
		}
	}
	componentDidMount(){
		let manager_id = this.props.id 
		let param = manager_id.toString()
		axios.get('http://localhost:3000/api/v1/members/'+param).then(response => {
			this.setState({manager: response.data.name})
			console.log(response)
		})
		.catch(error => console.log(error))
	}

	render(){
		return(
			<div className="cell">
				<h4>{this.props.firstName} {this.props.title_}</h4>
				<h4>Manager: {this.state.manager}</h4>
			</div>
		)
	}
};

export default Cell