import React from 'react';
import {All} from './rem/RemAll';
import {UpdateRe} from './rem/create';
import {Paa} from './rem/patching';
import { Reimbursement } from '../models/Reimbursement';
import {Authored} from './rem/author';
import {Stat} from './rem/bystatus';

interface IAppState {
    id:any
    // userid:number;
    // single: any;
    // levelup: Reimbursement[] | any;
  }
//   interface IApppProps {
//     id:number|any;
//   }

export default class users extends React.Component<IAppState,any> {

constructor(props:any){
    super(props);
    this.state = {
        id: this.props.id,
        current: this.props.id,
        value1: -1,
        input: null,
        value2: 1,
        input2: null,
        handleChange : this.handleChange.bind(this),
        handleSubmit : this.handleSubmit.bind(this),
        random: false,
        random1: false,
        random2: false,
        random3:false,
        random4:false,
    }
}
// shouldComponentUpdate(nextProps: any, nextState: any) {
//     return this.state.value !== nextState.value;
//   }

showIn = () => {
    this.setState({
      random: true,
      random1: false,
      random2:false,
      random3:false ,
      random4:false

    })
  }

  showAll = () => {
    this.setState({
      random: false ,
      random1: true,
      random2 :false,
      random3:false,
      random4:false 
    })
  }
  showS = () => {
    this.setState({
        random3: true,
      random: false ,
      random1: false,
      random2 :false,
      random4:false  
    })
  }

  showUp = () => {
    this.setState({
      random: false ,
      random2: true,
      random1: false,
      random3:false,
      random4:false
  
    })
  }

  showP = () => {
    this.setState({
      random: false ,
      random2: false,
      random1: false,
      random3:false,
      random4: true,
  
    })
  }

changevalue = () => {
    this.setState({
      value:  1     
    })
  }


   updateUserxx = (user:Reimbursement) => {
    this.setState({
      levelup: user,
    })
  }

  handleChange = (e:any) => {
    this.setState({input: e.target.value});
  }

  handleSubmit = (event:any)=> {
    this.setState({value1: this.state.input});
    event.preventDefault();
  }

  handleChange2 = (e:any) => {
    this.setState({input2: e.target.value});

  }

  handleSubmit2 = (event:any)=> {
    this.setState({value2: this.state.input2});
    event.preventDefault();
  }

    render(){
        return(
            <>
            <div className="panel">
            <span  onClick={this.showUp}> create new  </span>
            <span  onClick={this.showAll}>All </span>
            <span className="nottt">look up :  </span>
            <span  onClick={this.showIn}>by ID </span>
            <span  onClick={this.showS}>by status </span>
            <span  onClick={this.showP}>update </span>
            </div>

          { this.state.random &&   <div className="dif">
                <form onSubmit={this.handleSubmit} className="narrow">
                <label>Employee's ID: </label>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" value="Fetch" />
                <label>&nbsp;</label>
                </form>
            </div>}
            { this.state.random3 &&   <div className="dif">
                <form onSubmit={this.handleSubmit2} className="narrow">
                <label>Reimbursement Status: </label>
                <select onChange={this.handleChange2} >
                <option value="">choose</option>
                <option value="1">Pending</option>
                <option value="2">Aprroved</option>
                <option value="3">Denied</option>
                    </select>
                <input type="submit" value="Fetch" />
                <label>&nbsp;</label>
                </form>
            </div>}
            <div id ="hideme" className="wrapmein">

              
            { this.state.random && <Authored userid={this.state.value1}/>}
            { this.state.random3 && <Stat userid={this.state.value2}/>}
            { this.state.random1 && <All current={this.state.current} />}
            { this.state.random2 && <UpdateRe id={this.state.id} updateUserxx={this.updateUserxx}/>}
            { this.state.random4 && <Paa id={this.state.id} updateUserxx={this.updateUserxx}/>}
               </div>          
            </>
            
        )
    }
}