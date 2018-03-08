import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component{

	handlehyperLink(e){
		this.props.handleHyperLinkCallBack(e.target.name);
	}
	
	getTableBody(table){
      return table.map((value, index)=>{
          return(
              <tr>
                  <td><a href="javascript:void(0)" name={value.Id}  onClick={(e)=>this.handlehyperLink(e)}>{value.name}</a></td>
				  <td>{value.Id}</td>
                  <td>{value.email}</td>
                  <td>{value.status}</td>				  
              </tr>
          )
      })
	}
	render(){
		let table = this.props.data;
		return (
				<div>
					<table className="table">
						<thead>
							<tr>
								<th>Employee Name</th>
								<th>Employee ID</th>
								<th>Email Id</th>
								<th>Status</th>								
							</tr>
						</thead>
						<tbody>{this.getTableBody(table)}</tbody>
					</table> 
				</div>
			);    
	}
}

Table.propTypes={};
Table.defaultProps={};