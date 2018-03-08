import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
	
	handleSearchChange(e){
		this.props.handleSearchCallBack(e.target.value);
	}
	
	handleButton(){
		this.props.handleButtonCallBack();
	}
	render(){
		return(
				<div>
				{this.props.dropValue=="Organization Name"?"Organization Name":"Organization ID"}<br />
					<input type="text" name="search" id="search" onChange = {(e)=>this.handleSearchChange(e)} /><br />
					<button class="btn btn-primary" onClick={()=>this.handleButton()}>Find</button>
				</div>
			);
	}
}

Search.PropTypes={};
Search.defaultProps={};