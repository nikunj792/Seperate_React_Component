import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import find from 'lodash/find';
import DropDown from './component/dropdown';
import Search from './component/search';
import Table from './component/table';
import Contact from './component/contact';
import isNull from 'lodash';
import isEmpty from 'lodash';

export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dropValue:'Organization Name',
			searchval:'',
			tableArr:[],
			message:"",
			cardArr:[],
			errorText:"",
			error:""
		}
	}
	componentWillMount(){
		this.setState({
			displayTable:true,
			displayCard:false
		});
	}
		
	handleDrop(e){
		this.setState({
			dropValue:e
		})
	}
	
	handleSearch(e){
		this.setState({
			searchval:e
		})
	}
	
	handleButton(e){
		const searchBoxValue = this.state.searchval;
		const dropValue = this.state.dropValue;		
		let message = true;
	if(searchBoxValue == 'undefined' || searchBoxValue === ""){
		message="Please Enter Some Value !";
	}
		else if(dropValue==="Organization Name"){
		  const nameRegex = /^[a-zA-Z0-9 ]/;
		  if(!nameRegex.test(searchBoxValue)){
			message = "Organisation name should be alphanumeric !";
		  }
		}else if(dropValue==="Organization ID"){
		  const id = /^[0-9 ]+$/i;
		  if(!id.test(searchBoxValue)){
			message = "Organisation ID should be numeric !";
		  }
		}
		this.setState({message});
		const self = this;
		message===true&&$.ajax({
			url: "http://localhost:8080/v1/employees/search?name="+searchBoxValue,
			dataType: "json",
			success:(data) => {
				let filterData = data.Details;			
				let table;
				self.setState({
								tableArr:filterData
							});
			},
			error:(err)=>{
				self.setState({message:err.responseJSON.errorMessage})
				}	
		});
	}
	
	handleHyperLinkCallBack(ID){
		const cardArr =this.state.cardArr;		
		$.ajax({
			url: "http://localhost:8080/v1/employees/"+ID,
			dataType: "json",
			success:(data) => {
					const obj = data
					cardArr.push(obj);			
					this.setState({
						displayTable:false,
						displayCard:true,
						cardArr
						});				
			},
			error:(err)=>{
				self.setState({message:err.responseJSON.error})
				}			
		});	
	}
	
	handleChange(e){
		const cardArr = this.state.cardArr;
		cardArr[0].PersonalInfo.name = e.empName;
		cardArr[0].Id = e.empID;
		cardArr[0].PersonalInfo.address.city = e.comAdd;
		this.setState({cardArr});
		
	}
	render(){
		const arr = ['Organization Name','Organization ID'];
		return (
			<div>					
				{this.state.displayTable&&<DropDown name={arr} handleDropCallBack = {(e)=>this.handleDrop(e)} />}<br />
				{this.state.displayTable&&<Search dropValue = {this.state.dropValue} handleSearchCallBack = {(e)=>this.handleSearch(e)} handleButtonCallBack = {()=>this.handleButton()}/>}<br />
				{this.state.displayTable&&(this.state.tableArr.length>0 && this.state.tableArr[0] != undefined)?<Table data={this.state.tableArr} handleHyperLinkCallBack={(e)=>this.handleHyperLinkCallBack(e)} />:this.state.message}
				{this.state.displayCard&&<Contact cardData={this.state.cardArr} handleChangeData = {(e)=>this.handleChange(e)}/>}
			</div>
				)
	}
}
ReactDOM.render(<App />, document.getElementById("reactForm"));
