import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavbarComponent } from './components/NavbarComponent';
import { Writer } from './model/Writer';
import { LoginComponent } from './components/default/LoginComponent';
import Welcome from './components/default/Welcome';
import {Logout} from './components/default/Logout';
import Home from './components/default/Home';
import NoMatch from './components/default/NoMatch';
import PostComponent from './components/postComponenet';
import WriterComponent from './components/writerComponenet';




interface IAppState {
  loggedInWriter: Writer | null;
  id:number|any;
  // members: Writer | null;
}

export class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loggedInWriter: null,
      id: '',
      // members :null,
    }
  }

  updateWriter = (user:Writer) => {
    this.setState({
      loggedInWriter: user,
    })
    const cooid = this.state.loggedInWriter?.writerid;
    this.setState({
      id: cooid,
    })
  }

  // emptyMembers = (m:any) => {
  //   this.setState({
  //     members: null,
  //   })
  // }

  removeWriter = (u: any) => {
    this.setState({
      loggedInWriter: null,
    })
  }

  render() {
    const G = this.state.loggedInWriter;
    return (
    <>
    <Router>
      <div className="fixed">
    <Welcome permission={G?.permission || 'visitor'} username={G?.firstname || 'Guest'}/>
    <NavbarComponent Writer = {this.state.loggedInWriter}/>
     </div>
     <div className="wrap">
      <Switch>
      <Route path="/hello" exact>
          <Home />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>  
        { <Route exact path="/login">
          <LoginComponent  updateWriter={this.updateWriter} />
        </Route>}
        { G && <Route exact path="/logout">
          <Logout updateWriter={this.removeWriter}/>
        </Route>}
        { G && <Route path='/posts' exact >
          <PostComponent userRole={G.permission} id={this.state.id} xid={G.writerid}  />
          </Route>}
      { G && <Route path='/writers'  exact >
        <WriterComponent userRole={G?.permission} userId={G?.writerid} />
        </Route>}
        <Route><NoMatch updateWriter={this.updateWriter} /></Route>
      </Switch>
      </div>
    </Router>
    </>
    );
  }

}