import React from 'react';
import { authorRe } from '../../api/LibraryClient';
import { Reimbursement } from '../../models/Reimbursement';
import {Review} from './view1';
import { Err1, ErrS } from '../../errors/error1';


interface IBooksDisplayState {
  authorr: Reimbursement[]|any;
  isError: boolean;
  errorMessage: string;
  userid:number;
}

export class Authored extends React.Component<any, IBooksDisplayState> {

  constructor(props: any) {
    super(props);
    this.state = {
      authorr: [],
      isError: false,
      errorMessage: '',
      userid: this.props.userid,
    }
  }

  async componentDidMount() {
    this.setState({
    authorr: await authorRe(this.props.userid || this.state.userid),
          isError: false
        })
      }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.props.userid !== nextState.userid;
  }

 

  async UNSAFE_componentWillReceiveProps() {
    try {

      this.setState({
        authorr: await authorRe(this.props.userid || this.state.userid),
        isError: false
      })
    } catch (e) {
      // We set the error information in our state.
      // This will let us render something about the error to the end user
      this.setState({
        authorr: '',
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

    const data = this.state.authorr;
    if(typeof(data) === "string"){ 
            return <ErrS data={data} err={this.state.errorMessage} />
    }

    if(this.state.isError){
        return <Err1 err={this.state.errorMessage} />
    }else{
        return (data.map((u:Reimbursement|any,x:number) =>{
            return(
     <Review key={x} thekey={x} id={u.reimbursementId} author={u.author} amount={u.amount}
      resolver={u.resolver} status={u.status} type={u.type} description={u.description}
       date1={u.dateSubmitted} date2={u.dateResolved} />
                )      
                })
        )
    }
    
  }
  
}