import React from 'react';
import { patching } from '../../api/LibraryClient';

interface cc {
    ide:number;
    res:number;
    status:string;
    show:boolean;
}
export  class Review extends React.Component<any,cc> {
    constructor(props:any){
        super(props);
        this.deny = this.deny.bind(this);
        this.approve = this.approve.bind(this);

        this.state ={
            ide: this.props.id,
            res: this.props.resolverr,
            status : this.props.status,
            show:false,
        }
        

    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return this.state.status !== nextState.status;
      }
    deny = (x:any) =>{
        patching(this.props.id,this.props.resolverr,null,null,3,null); 
        // this.forceUpdate();
        this.setState({
            status: 'deny'  ,  
        })


    }
    showAll = (x:any) =>{
        patching(this.props.id,this.props.resolverr,null,null,2,null);
       //  this.forceUpdate();
        this.setState({
           show: true? false:true,  
       })
   }
    approve = (x:any) =>{
         patching(this.props.id,this.props.resolverr,null,null,2,null);
        //  this.forceUpdate();
         this.setState({
            status: 'approved'  ,  
        })
    }

    pending = (x:any) =>{
        patching(this.props.id,this.props.resolverr,null,null,1,null);
        // this.forceUpdate();
        this.setState({
           status: 'pending'  ,  
       })
   }
    render(){
        let yes = false;
        if(this.props.who === "finance-manager" && this.props.status === "pending"){
             yes = true;
        }
        return(
            <>
            <div key={this.props.thekey || Math.floor(Math.random() * 1000)} className="col">
            <p onClick={this.showAll}> <span>Reimbursement # </span> <span className="data">{this.props.id}</span></p>
            { this.state.show &&<>  
            <p> <span>Reimbursement # </span> <span className="data">{this.props.id}</span></p>  
            <p><span>author  </span><span className="data">{this.props.author}</span></p>  
            <p><span>amount</span>  <span className="data">{this.props.amount}</span></p>  
            <p><span>description </span><span className="data">{this.props.description}</span></p>  
            <p><span>status </span><span className="data">{this.state.status}</span></p>  
            <p><span>type </span><span className="data">{this.props.type}</span></p>  
            <p><span>Resolver </span><span className="data">{this.props.resolver}</span></p>  
            <p><span>date submitted </span> <span className="data">{this.props.date1}</span></p> 
            <p><span>date resolved </span><span className="data"> {this.props.date2}</span></p> 
            {yes && <span><button onClick={this.approve}>Approved</button><button onClick={this.deny}>Denied</button><button onClick={this.pending}>cancel</button></span>}
           </> }</div>
            </>
        )
    }
}