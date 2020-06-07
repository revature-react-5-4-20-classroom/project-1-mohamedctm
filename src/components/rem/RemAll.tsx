import React from 'react';
import { Reimbursement } from '../../models/Reimbursement';
import { Allreimbursements } from '../../api/LibraryClient';
import { Review } from './view1';
import { Err1 } from '../../errors/error1';
// import { QuickTable } from './QuickTable';

interface IBooksDisplayState {
  members: Reimbursement[];
  isError: boolean;
  errorMessage: string;
}

export class All extends React.Component<any, IBooksDisplayState> {

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
        members: await Allreimbursements()
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

  

  clearError = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    });
  }

  render() {
      
    if(!this.state.isError) {
      //map to a string so quicktable can render this.
      
      return this.state.members.map((u:Reimbursement)=>{
     return(
      <Review current={this.props.current} id={u.reimbursementId} author={u.author} amount={u.amount} resolver={u.resolver} status={u.status} type={u.type} description={u.description} date1={u.dateSubmitted} date2={u.dateResolved} />

         )      
         })
    } 
else { 
    return <Err1 err={this.state.errorMessage} />
        
    }
    
  }
  
}