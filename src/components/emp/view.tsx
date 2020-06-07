import React from 'react';


export  class Eview extends React.Component<any> {
    render(){
        return(
            <>
            <div className="col">
            <span>id:  {this.props.id}</span>  
          <span>username:  {this.props.username}</span>  
          <span>password:  {this.props.pass}</span>  
          <span>firstname: {this.props.firstname}</span>  
          <span>lastname: {this.props.lastname}</span>  
          <span>email: {this.props.email}</span>  
          <span>role: {this.props.role}</span>  
          </div>
            </>
        )
    }
}