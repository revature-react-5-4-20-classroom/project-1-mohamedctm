import React from 'react';
import { Reimbursement } from '../../models/Reimbursement';
import { createNew } from '../../api/LibraryClient';
import { Review } from './view1';
// import { Route, Switch, Redirect} from 'react-router';

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface IUpdateComponentProps {
  updateUserxx: (user:Reimbursement) => void;
  id:number|any;
}

interface ILoginComponentState {
    id: number |any,
    amount: number |any,
    description: number |any,
    type: number |any,
  userid: number | any;
  isError: boolean;
  errorMessage: string;
  success:boolean;
  user: Reimbursement |any;
}

export class UpdateRe extends React.Component<IUpdateComponentProps, ILoginComponentState> {

  constructor(props: IUpdateComponentProps) {
    super(props);
    this.state = {
        id: '',
        amount: '',
        description: '',
        type: '',
      userid: '',
      isError: false,
      errorMessage: '',
      success:false,
      user:'',
    }
  }

  setAmount= (pw: any) => {
    this.setState({
      amount: pw.currentTarget.value,
    })
  }
  setDescription = (pw: any) => {
    this.setState({
      description: pw.currentTarget.value,
    })
  }
  setType= (pw: any) => {
    this.setState({
      type: pw.currentTarget.value,
    })
  }
//   setId = (pw: any) => {
//     this.setState({
//       id: pw.currentTarget.value,
//     })
//   }

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
      success: false,
      id: '',
      amount: '',
      description: '',
      type: '',

      
    })
  }

  attemptUpdate = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const levelup : Reimbursement = await createNew(this.props.id,this.state.amount,this.state.description,this.state.type);
      this.props.updateUserxx(levelup);
      this.setState({
          user: levelup,
        amount: '',
        description: '',
        success: true
      });
      console.log(levelup);
    
    } catch (error) {
      this.setState({
        description: '',
        isError: true,
        success:false,
        errorMessage: error.message,
      })
    }
  }

  render() {
    if(!this.state.success){
    return (
      <div>
      <form onSubmit={this.attemptUpdate}>
        <span className="tag"> New</span>
          {/* <div>
            <input onChange={this.setId} value={this.state.id} type="number" name="id"  
            placeholder="ID (required!)"  required />
          </div> */}
          <div>
          <input onChange={this.setAmount} value={this.state.amount} type="number" name="amount"
           id="amount" placeholder="set amount"
           required/>
            <input onChange={this.setDescription} value={this.state.description} type="text" name="description" 
            placeholder="describe here" autoComplete='false' required />
          </div>
          
            <div>
            <select onChange={this.setType} name="type" required>
            <option >select type</option>
            <option value="1">Food</option>
            <option value="2">Travel</option>
            <option value="3">Other</option>
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
    <h3>Submitted ..

        <span className="button" onClick={this.clearError}>create another</span>
    </h3>
    <Review id={data.reimbursementId} author={data.author} amount={data.amount} resolver={data.resolver} status={data.status} type={data.type} description={data.description} date1={data.dateSubmitted} date2={data.dateResolved} />

    </>
     ) 
    }
  }

}