import React from 'react';
import { NavLink } from 'react-router-dom';


export class NavbarComponent extends React.Component<any,any> {



  render() {

    return (
      
    <>
        <ul>     
          <li><NavLink to="/hello" >Home</NavLink></li>
          {  this.props.User && <li><NavLink to="/employees">{this.props.User.role=== "employee"? 'Profile' : 'Employees'}</NavLink></li>}
          { this.props.User && <li><NavLink to="/reimbursements"> Reimbursements</NavLink></li>}
          <li className="last">&nbsp;</li>
          { !this.props.User && <li><NavLink to="/login">Login</NavLink></li>}          
          { this.props.User && <li><NavLink to="/logout">Logout</NavLink></li>}
        </ul>
    </>
    )
    }
}