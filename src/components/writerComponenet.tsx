import React from 'react';
import { Writer } from '../model/Writer';






// interface IAppState {
//     userid:number;
//     single: any;
//     levelup: Writer[] | any;
//     userRole: any;
//     userId: any;
//   }

export default class WriterComponent extends React.Component<any,any> {



    render(){
        return(
            <>
            { (this.props.userRole === 1) &&
            <div className="panel" id="admin page">
            <span> profile </span>
            <span> posts </span>
            <span> control </span>
            </div>}
            { (this.props.userRole === 2) &&
            <div className="panel" id="admin page">
            <span> profile </span>
            <span> posts </span>
            <span> editor </span>
            </div>}

            { (this.props.userRole === 3) &&
            <div className="panel" id="admin page">
            <span>Profile </span>
            <span> posts  </span>
            </div>}
         
            </>
            
        )
    }
}