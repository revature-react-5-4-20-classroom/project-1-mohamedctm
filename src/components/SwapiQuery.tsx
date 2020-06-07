import React from 'react';
import { getPlanet } from '../api/SwapiClient';

export class SwapiQuery extends React.Component<any, any> {

  //Our constructor is used by React before anything hits the actual DOM/page
  // React manages something called the "virtual DOM" that it uses for optimizations
  // React might recreate our components and modify this virtual DOM more or less times
  // than we expect as it optimizes.  What this means is that the constructor, and any
  // of our functions that use the virtual DOM should HAVE NO SIDE EFFECTS.

  // The shorter punchline is, only send HTTP requests in two special methods on your components:
  // componentDidMount() and componentDidUpdate()
  constructor(props: any) {
    super(props);
    this.state = {
      swapiResponse: 'pending...',
      userid: 1,
    }
  }

  async componentDidMount() {
    //This runs after the component has added an element to the actual DOM for the first time.
    // In other words, this runs once the component is done being created.
    // Send requests here!
    this.setState({
      swapiResponse: await getPlanet(this.state.userid)
    });
  }

  // Lets us explicitly compare new state and new props to the current state and props
  // Then decide if we need to update or not.
  // We can use this to make our app more efficient and fix update->setState->update loops
  shouldComponentUpdate(nextProps: any, nextState: any) {
    // If this returns true, the component will update.  If false, the component won't.
    // should update if we have different response from SWAPI, otherwise no.
    return this.state.swapiResponse !== nextState.swapiResponse;
  }

  async componentDidUpdate() {
    //This runs when the component updates on the actual DOM
    this.setState({
      swapiResponse: await getPlanet(this.state.userid)
    });
  }

  // We could send a request here too, that'd be OK.
  incrementPlanetId = () => {
    this.setState({
      planetId: this.state.userid + 1
    })
  }

  render() {
    return (
      <>
      {/* Button that adds one to planetId */}
      <button onClick={this.incrementPlanetId}>Next Planet</button>
      {/* We needed the JSON.stringify to turn our planet object into a string */}
      <p>Response from SWAPI for id {this.state.userid}: {JSON.stringify(this.state.swapiResponse)}</p>
      </>
    );
  }

}