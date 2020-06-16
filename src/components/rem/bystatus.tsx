import React from 'react';
import { sta } from '../../api/LibraryClient';
import { Reimbursement } from '../../models/Reimbursement';
import { Review } from './view1';
import { Err2, ErrS } from '../../errors/error1';


interface IBooksDisplayState {
  single: any;
  isError: boolean;
  errorMessage: string;
}

export class Stat extends React.Component<any, IBooksDisplayState> {

  constructor(props: any) {
    super(props);
    this.state = {
      single: this.props.single,
      isError: false,
      errorMessage: '',
    }
  }

  async componentDidMount() {
    this.setState({
      single: await sta(this.props.userid),
          isError: false
        })
      }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.props.single !== nextState.single;
  }

  async UNSAFE_componentWillReceiveProps() {
    try {

      this.setState({
        single: await sta(this.props.userid),
        isError: false
      })
    } catch (e) {
      // We set the error information in our state.
      // This will let us render something about the error to the end user
      this.setState({
        single: '',
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

    const data = this.state.single;
    console.log(typeof(data));
    if(typeof(data) === "string"){ 
        return <ErrS data={data} err={this.state.errorMessage}/>


    }

    if(this.state.isError){
      return <Err2 err={this.state.errorMessage}/>
    }else{

        return (data.map((u:Reimbursement|any,x:number) =>{
            return(
                <Review who={this.props.who} resolverr={this.props.resolverr} key={x} thekey={x} id={u.reimbursementId} author={u.author} amount={u.amount} resolver={u.resolver} status={u.status} type={u.type} description={u.description} date1={u.dateSubmitted} date2={u.dateResolved} />

)      
})

        )
  }
    
  }
  
}