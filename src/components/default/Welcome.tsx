import React from 'react';

export default class Welcome extends React.Component<any> {
    
  
    render(){
        let role;
        switch(this.props.permission){
            case 1: role = "Admin";
            break;
            case 2: role = "Editor";
            break;
            case 3: role = "Writer";
            break;
            default: role = "visitor";


        }
        return(
            
            <>
            <div className="logoo"> 
                <span>
                    Hi {this.props.username},
                </span>
                <span className="farmost">
                    {role}
                </span> 
                </div>
            </>
        )
    }
}