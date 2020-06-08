import React from 'react';
import {AllUsers} from './emp/UsersAll';
import {SingleUser} from './emp/SingleUser';
import {UpdateUsers} from './emp/updatex';
import { User } from '../models/User';

import {UpdateUsersx} from './emp/updatexx';
import {AllUsersx} from './emp/UsersAllx';





// interface IAppState {
//     userid:number;
//     single: any;
//     levelup: User[] | any;
//     userRole: any;
//     userId: any;
//   }

export default class users extends React.Component<any,any> {

constructor(props:any){
    super(props);
    this.state = {
        userid : 2,
        value: '',
        single:'' ,
        input: '',
        handleChange : this.handleChange.bind(this),
        handleSubmit : this.handleSubmit.bind(this),
        random: false,
        random1: false,
        random2: false,
        randomx1: false,
        randomx2: false,
        good:false,
        userRole: this.props.userRole,
        userId : this.props.userId
    }
}
// shouldComponentUpdate(nextProps: any, nextState: any) {
//     return this.state.value !== nextState.value;
//   }

showIn = () => {
    this.setState({
      random: true,
      random1: false,
      random2:false
    })
  }

  showAll = () => {
    this.setState({
      random: false ,
      random1: true,
      random2 :false  
    })
  }

  showx1 = () => {
    this.setState({
      randomx1: true,
      randomx2 :false  
    })
  }

  showx2 = () => {
    this.setState({
      randomx1: false,
      randomx2 :true  
    })
  }

  showUp = () => {
    this.setState({
      random: false ,
      random2: true,
      random1: false   
    })
  }

changevalue = () => {
    this.setState({
      value:  1  ,
    })
  }


   updateUserxx = (user:User) => {
    this.setState({
      levelup: user,
    })
  }

  handleChange = (e:any) => {
    this.setState({value: e.target.value,
        good: true   
    });
    this.setState({random : true, random1:false})
  }

  handleSubmit = (event:any)=> {
    this.setState({value: this.state.input,      
        good: false    });
    event.preventDefault();
  }

    render(){
        return(
            <>
            { (this.props.userRole === "admin" || this.props.userRole === "finance-manager") &&
            <div className="panel" id="admin page">
            <span  onClick={this.showAll}>All </span>
            <span  onClick={this.showUp}> Update  </span>
            <span  onClick={this.showIn}>look up </span>
            </div>}

            { (this.props.userRole === "employee") &&
            <div className="panel" id="admin page">
            <span  onClick={this.showx1}>Profile </span>
            <span  onClick={this.showx2}> Update Profile  </span>
            </div>}

          { this.state.random &&   <div className="dif">
                <form onSubmit={this.handleSubmit} className="narrow">
                <label>Employee ID: </label>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" onClick={this.handleSubmit} value="Fetch" />
                <label>&nbsp;</label>
                </form>
            </div>}
            <div className="wrapmein">

            { this.state.random && <SingleUser userid={this.state.value} good={this.state.good}/>}
            { this.state.random1 && <AllUsers />}
            { this.state.random2 && <UpdateUsers updateUserxx={this.updateUserxx}/>}

            { this.state.randomx1 && <AllUsersx getUser={this.state.userId} />}
            { this.state.randomx2 && <UpdateUsersx getUser={this.state.userId} updateUserxx={this.updateUserxx}/>}
               </div>          
            </>
            
        )
    }
}