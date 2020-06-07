import React from 'react';
import { NavLink } from 'react-router-dom';

interface state{
  homeA:string;
}

export class NavbarComponent extends React.Component<any,state> {



  render() {
    return (
    <>
        <ul>     
          <li><NavLink to="/hello" >Home</NavLink></li>
          {  this.props.User && <li><NavLink to="/employees">Employees</NavLink></li>}
          { this.props.User && <li><NavLink to="/reimbursements"> Reimbursements</NavLink></li>}
          <li key={Math.floor((Math.random() * 3220) + 1)} className="last">&nbsp;</li>
          { !this.props.User && <li><NavLink to="/login">Login</NavLink></li>}          
          { this.props.User && <li><NavLink to="/logout">Logout</NavLink></li>}
        </ul>
    </>
    )
    }
}