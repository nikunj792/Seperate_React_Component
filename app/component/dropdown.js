import React from 'react';
import PropTypes from 'prop-types';

class DropDown extends React.Component{
	constructor(props){
		super(props);
		this.state={
			drop:""
		}
	}
	handleDropDownChange(e){
		this.setState({
			drop:e.target.value
		},this.props.handleDropCallBack(e.target.value));
	}
	render(){
	const arr = this.props.name;
	return(
			<div>
				<h5>Search By:</h5>
				<select class="selectpicker" onChange ={(e)=>this.handleDropDownChange(e)}>
				{arr.length>0&&arr.map((val,key)=><option value={val} key={key}>{val}</option>)}	
				</select>
			</div>
		);	
	}
}

DropDown.propTypes={
	drop:PropTypes.string
};

DropDown.defaultProps={
	drop:""
};

export default DropDown;