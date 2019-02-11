import React from 'react';
import './Map.css';
import Form from "./Form"
import Cell from "./Cell"
import axios from 'axios'
import * as d3 from "d3"


class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			cells: [],
			tree: {}
		}

	}

	componentDidMount(){
		axios.get('http://localhost:3000/api/v1/members').then(response => {
			this.setState({cells: response.data})
			// console.log(response.data[0].name)
			if(response.data.length >= 1){
				// console.log('hello')
				this.structureTree()
			}
		})
		.catch(error => console.log(error))

	}
	

	findRoot(){
		let data = this.state.cells 
		let root
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].manager_id == null){
				root = data[i]
			}
		}
		// console.log(root)
		return root
	}

	findChildren(parent_){
			// console.log(parent_)
			let id = parent_.id.toString();
			axios.get('http://localhost:3000/api/v1/members/'+id+'/children').then(response => {
				// console.log('enter')
				if (response.data.length >= 1){
				let treeObj = {
					'name' : '',
					'children': []
				};
				treeObj['name'] = parent_.name;
				let set = [];
				// console.log(treeObj);

				let child = response.data;
				for(let i in response.data){
					console.log(response.data[i])
					let datum = this.findChildren(response.data[i])
					console.log(datum)
				}
				// child.map((person) =>{(
				// 		// let datum = this.findChildren(person)
				// 		// console.log(datum)
				// 		// set.push(datum)
				// 		set.push(this.findChildren(person))
				// 	)
				// });
				// console.log(set);
				treeObj['children'] = set;
    			console.log("with children", treeObj);
    			return treeObj;
    		}
    		else{
    			let treeObj = {
    				'name': ''
    			};
    			treeObj['name'] = parent_['name'];
    			console.log("without children", treeObj)
    			return treeObj;
    		}
				
			})
			.catch(error => console.log(error))
    }



	changeFormat(t){
	console.log("inside format", typeof t)
    let result = {"children":[]}
    console.log(t[0])
    console.log("**",Array.isArray(t)) 
    for(var i = 0; i < t.length; i++){
    	console.log('enter here', i)
        for(let key in t[i]){
        	console.log("enter first for", t[i])
            if(key == "parent"){
                result["name"] = t[i].parent.name
            }
            if(key == "children"){
                for(var j = 0; j < t[i].children.length; j++){
                    result["children"].push({"name":t[i].children[j].name})
                }
            }
        }
    }
    return result
}

	structureTree(){
		
		let start = this.findRoot()
		this.setState({tree: start})
		let seed = this.findChildren(this.state.tree)
		// let sapling = this.sproutTree(seed)
		// let sapling = this.changeFormat(l)
		// console.log("sap result", sapling)
		console.log("Tree Results", seed)
		this.setState({tree: seed})
		return seed
	}

	


	render(){

		let num = 1
		return(
			<div>
			    <Form />
				<div className="container map">
				
				</div>
				
			</div>
		)
	}
}

export default Map