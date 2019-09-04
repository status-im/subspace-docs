# redux 

Phoenix can be used with [redux](https://redux.js.org/). Phoenix returns [`Observables`](https://rxjs-dev.firebaseapp.com/guide/observable), which you can subscribe to, and if this subscription has access to the redux store, it will be able to dispatch actions when the observable emits an event.

Here's a simple example on how to setup Phoenix to work with `redux`. An example using `react` and `redux` can be found in the `examples` folder.


#### index.js
```js
/* global web3 */
import store from './store';
import Phoenix from 'phoenix';
import { myAction } from './actions';

const eventSyncer = new Phoenix(web3.currentProvider);

eventSyncer.init().then(() => {
  eventSyncer
    .trackEvent(MyContract, "MyEvent", { filter: {}, fromBlock: 1})
    .subscribe(eventData => {
      store.dispatch(myAction(eventData));
    });
});
```

#### store.js
```js
import { createStore } from 'redux';
import {myReducer} from './reducer';

export default store = createStore(myReducer);
```

#### reducer.js
```js
import { MY_ACTION } from "./constants";

const initialState = { 
  data: {}
};

export const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_ACTION:
      return { data: action.eventData };
    default:
      return state;
  }
};
```

#### constants.js
```js
export const MY_ACTION = 'MY_ACTION';
```

#### actions.js
```js
import {MY_ACTION} from './constants.js';

export const myAction = eventData => ({type: MY_ACTION, eventData});
```
