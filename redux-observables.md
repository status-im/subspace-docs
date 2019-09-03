# redux-observables
Phoenix can be configured in epics created with [redux-observables](https://redux-observable.js.org/). It's recommended to compose these epics by using [mergeMap](https://www.learnrxjs.io/operators/transformation/mergemap.html) or [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html) operators

```js
import {mergeMap, map} from 'rxjs/operators';

const rootEpic = action$ =>
  action$.pipe(
    ofType("INIT"),  // Execute when the action type is 'INIT'
    mergeMap(action =>
      eventSyncer
        .trackEvent(MyContract, "MyEventName", { filter: {}, fromBlock: 1})
        .pipe(
          map(eventData => myAction(eventData)) // Trigger redux action: MY_ACTION
        )
    )
  );



// Read more about epics here: https://redux-observable.js.org/docs/basics/Epics.html
const rootReducer = (state = {}, action) => { /* TODO */ };

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
```