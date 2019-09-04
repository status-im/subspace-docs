# redux-observables

[redux-observables](https://redux-observable.js.org/) can be used to manage side effects via `Epics` (their core primitive to receive and create stream of actions).  Phoenix can be configured inside these epics. 

It's recommended to compose these epics by using [mergeMap](https://www.learnrxjs.io/operators/transformation/mergemap.html) or [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html) operators.

Here's an example on how to use phoenix to subscribe to an Event when the action `INIT` is dispatched, and then it will trigger `myAction` when the observable emits a value.

```js
import { switchMap, map } from 'rxjs/operators';
import Phoenix from 'phoenix';
import { myAction } from './actions';

// initialize phoenix
const eventSyncer = new Phoenix(web3.currentProvider);
eventSyncer.init();

const rootEpic = action$ =>
  action$.pipe(
    ofType("INIT"),  // Execute when the action type is 'INIT'
    switchMap(action =>
      eventSyncer
        .trackEvent(MyContract, "MyEventName", { filter: {}, fromBlock: 1})
        .pipe(
          map(eventData => myAction(eventData)) // Trigger redux action: MY_ACTION
        )
    )
  );


const rootReducer = (state = {}, action) => { /* TODO: implement reducer */ };

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);


// ... later

store.dispatch()
```

Read more about epics here: https://redux-observable.js.org/docs/basics/Epics.html