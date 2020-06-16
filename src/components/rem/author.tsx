import React from 'react';
import { authorRe } from '../../api/LibraryClient';
import { Reimbursement } from '../../models/Reimbursement';
import {Review} from './view1';
import { Err1 } from '../../errors/error1';


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
      userid: isNaN(this.props.userid)? 100: this.props.userid,
    }
  }

  async componentDidMount() {
    this.setState({
    authorr: await authorRe(isNaN(this.props.userid)? 100 :this.props.userid),
          isError: false
        })
      }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.props.authorr !== nextState.authorr;
  }

 

  async UNSAFE_componentWillReceiveProps() {
    try {

      this.setState({
        authorr: await authorRe(isNaN(this.props.userid)? 100 : this.props.userid ),
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

    
    

    if(this.state.isError){
        return <Err1 err={this.state.errorMessage} />
    }else{
      var data = this.state.authorr;
      if(typeof(data) === "string"){ 
        return <h3>{JSON.stringify(data)}</h3>
        }
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