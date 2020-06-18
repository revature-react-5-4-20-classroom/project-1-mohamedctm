import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import { destroy } from '../../api/LibraryClient';
import {Writer} from '../../model/Writer';

interface ILoginComponentProps {
    updateWriter: (user:Writer) => void;
    // emptyMembers: (user:Writer) =>void;
  }

export default class NoMatch extends React.Component<ILoginComponentProps,any> {

    componentDidMount(){
        const loggedInWriter : any = null;
      this.props.updateWriter(loggedInWriter); 
      destroy();
    }

    render(){
        return(
            
            <>
            <Switch>
        <Route>
        <Redirect to="/hello"/>
        </Route>
      </Switch>
            </>
        )
    }
}