import React from 'react';
import { User } from '../../models/User';
import { getSingle } from '../../api/LibraryClient';
import { Eview } from './view';
// import { QuickTable } from './QuickTable';

interface IBooksDisplayState {
  members: User[]|any;
  isError: boolean;
  errorMessage: string;
}

export class AllUsersx extends React.Component<any, IBooksDisplayState> {

  constructor(props: any) {
    super(props);
    this.state = {
      members: [],
      isError: false,
      errorMessage: '',
    }
  }

  async componentDidMount() {
    try {
      this.setState({
        members: await getSingle(this.props.getUser)
      })
    } catch (e) {
      // We set the error information in our state.
      // This will let us render something about the error to the end user
      this.setState({
        
        isError: true,
        errorMessage: e.message,
      })
    }
  }
   componentWillUnmount() {

      this.setState({
        members: null,
        isError: false,
        errorMessage: '',
      })
  }

  

  clearError = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    });
  }

  render() {
    if(!this.state.isError) {
      //map to a string so quicktable can render this.
      const u = this.state.members;
      return (
         <Eview id={u.id} username={u.username} pass={u.password}
          firstname={u.firstname} lastname={u.lastname}
           email={u.email} role={u.role} />

      )
         
         
    } 
else {
      switch(this.state.errorMessage){
          case "Request failed with status code 402":
             return <h3>login required</h3>
          case "Request failed with status code 403":
             return  <h3>Finance manager role is required!</h3>
          default :
             return <h3>unknown Error</h3>
      }
    }
    
  }
  
}