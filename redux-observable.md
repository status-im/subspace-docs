# redux-observable

[redux-observables](https://redux-observable.js.org/) can be used to manage side effects via `Epics` (their core primitive to receive and create stream of actions).  Phoenix can be configured inside these epics. 

It's recommended to compose these epics by using [mergeMap](https://www.learnrxjs.io/operators/transformation/mergemap.html) or [switchMap](https://www.learnrxjs.io/operators/transformation/switchmap.html) operators.

Here's an example on how to use phoenix to subscribe to an Event when the action `SOME_ACTION` is dispatched, and then it will trigger `myAction` when the observable emits a value.

```js
// ...

const myEpic = action$ =>
  action$.pipe(
    ofType("SOME_ACTION"),  // Execute when the action type is 'INIT'
    switchMap(action =>
      eventSyncer
        .trackEvent(MyContract, "MyEventName", { filter: {}, fromBlock: 1})
        .pipe(
          map(myAction) // Trigger redux action: MY_ACTION with the eventData
        )
    )
  );

// ...
```

#### Further read
- [Epics](https://redux-observable.js.org/docs/basics/Epics.html)

::: tip 
An example is available in [Github](https://github.com/status-im/phoenix/tree/master/examples/redux-observable)
:::