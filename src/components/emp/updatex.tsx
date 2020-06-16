import React from 'react';
import { User } from '../../models/User';
import { updatexx } from '../../api/LibraryClient';
import { Eview } from './view';
import { Err1 } from '../../errors/error1';
import  bcrypt from 'bcryptjs';

// import { Route, Switch, Redirect} from 'react-router';

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface IUpdateComponentProps {
  updateUserxx: (user:User) => void;
}

interface ILoginComponentState {
  username: string|any;
  password: string|any;
  firstname: string|any;
  lastname: string|any;
  email: string|any;
  role: string|any;
  userid: number | any;
  isError: boolean;
  errorMessage: string;
  success:boolean;
  user: User |any;
}

export class UpdateUsers extends React.Component<IUpdateComponentProps, ILoginComponentState> {

  constructor(props: IUpdateComponentProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      userid: '',
      isError: false,
      errorMessage: '',
      success:false,
      user:'',
    }
  }

  //We'll need a few functions to modify individual pieces of our state
  // These take change events
  setUsername = (un: any) => {   
    this.setState({
        username: un.currentTarget.value
        })  
  }

  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    })
  }
  setFirstname = (pw: any) => {
    this.setState({
      firstname: pw.currentTarget.value,
    })
  }
  setLastname= (pw: any) => {
    this.setState({
      lastname: pw.currentTarget.value,
    })
  }
  setEmail = (pw: any) => {
    this.setState({
      email: pw.currentTarget.value,
    })
  }
  setRoleid= (pw: any) => {
    this.setState({
      role: pw.currentTarget.value,
    })
  }
  setUserid = (pw: any) => {
    this.setState({
      userid: pw.currentTarget.value,
    })
  }

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
      success: false,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      role: '',

    })
  }

  attemptUpdate = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const levelup : User = await updatexx(this.state.username, bcrypt.hashSync(this.state.password,1),this.state.firstname,this.state.lastname,this.state.email,this.state.role,this.state.userid);
      this.props.updateUserxx(levelup);
      this.setState({
          user: levelup,
        username: '',
        password: '',
        success: true
      });
      console.log(levelup);
    
    } catch (error) {
      this.setState({
        password: '',
        isError: true,
        success:false,
        errorMessage: error.message,
      })
    }
  }

  render() {
      if(this.state.isError){
          return <Err1 err={this.state.errorMessage} />
      }
    if(!this.state.success){
    return (
      <div>
      <form onSubmit={this.attemptUpdate}>
        <span className="tag"> update</span>
          <div>
            <input onChange={this.setUserid} value={this.state.userid} type="number" name="id"  
            placeholder="ID (required!)"  required />
          </div>
          <div>
          <input onChange={this.setUsername} value={this.state.username} type="text" name="username"
           id="username" placeholder="change username"
           autoComplete={this.state.username} />
            <input onChange={this.setPassword} value={this.state.password} type="password" name="password" 
            placeholder="change password" autoComplete='false' />
          </div>
          <div>
            <input onChange={this.setFirstname} value={this.state.firstname} type="text" name="firstname" 
            placeholder="change firstname"  />
            <input onChange={this.setLastname} value={this.state.lastname} type="text" name="lastname" 
            placeholder="Last name" />
          </div>
          <div>
            <input onChange={this.setEmail} value={this.state.email} type="email" name="email" 
            placeholder="change email"  />
            <select onChange={this.setRoleid} name="roleid">
            <option value="">select role</option>
            <option value="1">admin</option>
            <option value="2">finance-manager</option>
            <option value="3">employee</option>
            </select>
          </div>
          
          <div className="notdiv">
            <input type="submit" value="submit" />
          </div>
      </form>
     {<h3>{this.state.errorMessage}</h3>}
      </div>
    );
    }
    else{ 
        
        const data = this.state.user;
        
        return (
      <>
    <h3>user updated successfuly
        <span className="button" onClick={this.clearError}>Make another update</span>
    </h3>
    <Eview access={data.id} id={data.id} username={data.username} pass={data.password}
          firstname={data.firstname} lastname={data.lastname}
           email={data.email} role={data.role} />
    </>
     ) 
    }
  }

}