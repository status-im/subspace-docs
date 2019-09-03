# redux
Observables can be used with `redux`. The subscription can dispatch actions using if it has access to the redux store:

```js
// This example assumes it has access redux store, and the reducer 
// and middleware have been configured correctly, and phoenix has 
// been initialized.

const store = ... //

const myAction = eventData => ({type: 'MY_ACTION', eventData});

const myObservable = eventSyncer.trackEvent(SimpleStorageContract, "MyEvent", { filter: {}, fromBlock: 1});

myObservable.subscribe(eventData => {
  store.dispatch(myAction(eventData));
});
```