# react
The `observe` HOC is provided to enhance a presentational component to react to any phoenix event. This HOC subscribes/unsubscribes automatically to any observable it receives via `props`.

```js
/* global web3 */
import React from "react";
import ReactDOM from 'react-dom';
import Phoenix from "phoenix";
import {observe} from "phoenix/react";
import SimpleStorageContract from "./SimpleStorageContract"; // web3.eth.Contract object


const MyComponent = ({eventData}) => {
  if(!eventData)
    return <p>Loading...</p>;
  
  return <p>{eventData.someReturnedValue}</p>
};

const MyComponentObserver = observe(MyComponent); // MyComponent will now observe any observable props!


class App extends React.Component {
  state = {
    myEventObservable: null
  }

  componentDidMount() {
    const eventSyncer = new Phoenix(web3.currentProvider);
    eventSyncer.init()
      .then(
        const myEventObservable = eventSyncer.trackEvent(SimpleStorageContract, "MyEvent", {}, fromBlock: 1 });
        this.setState({ myEventObservable });
      );
  }

  render() {
    return <MyComponentObserver eventData={this.state.myEventObservable} />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
