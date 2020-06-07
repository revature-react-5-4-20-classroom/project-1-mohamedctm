import React from 'react';
import { getSingle } from '../../api/LibraryClient';
import { Err1, ErrS } from '../../errors/error1';
import { Eview } from './view';


interface IBooksDisplayState {
  single: any;
  isError: boolean;
  errorMessage: string;
  _isMounted:boolean;
}

export class SingleUser extends React.Component<any, IBooksDisplayState> {

  constructor(props: any) {
    super(props);
    this.state = {
      single: 'fetching user by id',
      isError: false,
      errorMessage: '',
      _isMounted: true,
    }
  }

  async componentWillMount() {
    
    try {
      this.setState({
        single: await getSingle(this.props.userid),
        isError: false,
        _isMounted : true,
      })
    } catch (e) {
      // We set the error information in our state.
      // This will let us render something about the error to the end user
      this.setState({
        isError: true,
        errorMessage: e.message,
      })
    // }
  }
  }
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.props.single !== nextState.single;
  }

  async componentWillUnmount(){
    this.setState({
      single: null,
      isError: false,
      _isMounted : false,
    })
  }

  async componentDidUpdate() {
    
    try {
      this.setState({
        single: await getSingle(this.props.userid),
        isError: false,
        _isMounted : false
      })
    } catch (e) {
      // We set the error information in our state.
      // This will let us render something about the error to the end user
      this.setState({
        isError: true,
        errorMessage: e.message,
      })
    // }
  }
  }


  

  clearError = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    });
  }



  render() {
    const u = this.state.single;
    if(typeof(u) === "string"){ 
      return <ErrS data={u} err={this.state.errorMessage} />
}

if(this.state.isError){
  return <Err1 err={this.state.errorMessage} />

    }else{
    return(
      <>
     <Eview access={u.id} id={u.id} username={u.username} pass={u.password}
          firstname={u.firstname} lastname={u.lastname}
           email={u.email} role={u.role} />
          </>
    )
  }
    
  }
  
}