import React from 'react';
import PropTypes from 'prop-types';

export default class Contact extends React.Component{
	
	handleChangeData(e){
		let empName = prompt("Update Employee Name");
		let empID = prompt("Update Employee ID");
		let comAdd = prompt("update Employee Address");
		let obj ={};
		obj.empName = empName;
		obj.empID = empID;
		obj.comAdd = comAdd;
		this.props.handleChangeData(obj);
	}
	
	render(){
		let card = this.props.cardData[0];
		if(card != null){
            const personalInfo = card.PersonalInfo;
            const professionalInfo = card.ProfessioalInfo;
		const dom = (
				<div  className="row">
                    <div className="col-md-6 card">
                        <h4>Personal Info Card</h4>
						<a onClick = {(e)=>this.handleChangeData(e)}>Update</a>
                            <ul className="list-group">
                                <li className="list-group-item">Employee Name: {personalInfo.name}    </li> 
                                <li className="list-group-item">Employee Id: {card.Id}</li>
                                <li className="list-group-item">Communication Address: {personalInfo.address.city}</li>
                            </ul>

                </div>
                    <div className="col-md-6 card">
                        <h4>Professional Info Card</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Employee Id: {card.Id}</li>
                            <li className="list-group-item">Status :{professionalInfo.status}</li>
                        </ul>
                    </div>
                </div>
				);
            return dom;
        }else{
            const dom = (
                <div  className="row">
                    <p>No data</p>
                </div>
            );
            return dom;
        }
    }
}

Contact.propTypes={};
Contact.defaultProps={};