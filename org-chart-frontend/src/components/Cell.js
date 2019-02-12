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
		// // let manager_id = this.props.member.id 
		// // let param = manager_id.toString()
		// axios.get('http://localhost:3000/api/v1/members/'+param).then(response => {
		// 	this.setState({manager: response.data.name})
		// 	console.log(response)
		// })
		// .catch(error => console.log(error))
	}
	handleUpdate = () => {this.props.onUpdate(this.props.member.id)}
	handleDelete = () => {this.props.onDelete(this.props.member.id)}
	render(){
		return(

			<tr className= ''>
				<td className='text-center'>
				{this.props.member.name}
				</td>
				<td className='text-center'>
				{this.props.member.title}
				</td>
				<td className='text-center'>
					<button className='btn user' onClick={this.handleUpdate}>
					<i className='fa fa-user'></i>
				 	</button>
					<button className='btn delete' onClick={this.handleDelete}>
					<i className='fa fa-close'></i>
				 	</button>
				</td>
			</tr>
			// <div className="cell">
			// 	<h4>{this.props.firstName} {this.props.title_}</h4>
			// 	<h4>Manager: {this.state.manager}</h4>
			// </div>
		)
	}
};

export default Cell