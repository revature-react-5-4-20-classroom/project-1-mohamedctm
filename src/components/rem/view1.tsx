import React from 'react';


export  class Review extends React.Component<any> {
    render(){
        return(
            <>
            <div key={this.props.thekey || Math.floor(Math.random() * 1000)} className="col">
            <span>Reimbursement #  <span>{this.props.id}</span></span>  
            <span>author  <span>{this.props.author}</span></span>  
            <span>amount  <span>{this.props.amount}</span></span>  
            <span>description <span>{this.props.description}</span></span>  
            <span>status <span>{this.props.status}</span></span>  
            <span>type <span>{this.props.type}</span></span>  
            <span>Resolver <span>{this.props.resolver}</span></span>  
            <span>date submitted <span>{this.props.date1}</span></span> 
            <span>date resolved<span> {this.props.date2}</span></span> 
            </div>
            </>
        )
    }
}