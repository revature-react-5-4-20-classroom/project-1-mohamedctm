import React from 'react';
import { NavLink } from 'react-router-dom';


export class NavbarComponent extends React.Component<any,any> {



  render() {

    return (
      
    <>
        <ul>     
          <li><NavLink to="/hello" >Home</NavLink></li>
          {  this.props.Writer && <li><NavLink to="/writers">{this.props.Writer.permission === 3 ? 'Profile' : 'Writers'}</NavLink></li>}
          { this.props.Writer && <li><NavLink to="/posts"> Posts</NavLink></li>}
          <li className="last">&nbsp;</li>
          { !this.props.Writer && <li><NavLink to="/login">Login</NavLink></li>}          
          { this.props.Writer && <li><NavLink to="/logout">Logout</NavLink></li>}
        </ul>
    </>
    )
    }
}