# Getting Started

## Installation
**Subspace** can be used in browser, node and native script environments. To get started install the package `@status-im/subspace` using `npm` or `yarn` by executing this command in your project directory:
```bash
# Using npm
npm install --save @status-im/subspace

# Using yarn
yarn add @status-im/subspace 
```

## Importing the library

```js
// ESM (might require babel / browserify)
import Subspace from '@status-im/subspace';  

// CommonJS
const Subspace = require('@status-im/subspace'); 
```


## Connecting to a web3 provider
To interact with the EVM, **Subspace** requires a valid websockets Web3 provider.

```js
const subspace = new Subspace(web3.currentProvider);
await subspace.init();
```

In addition to the provider, `Subspace` also accepts an `options` object with settings that can change its behavior:
- `dbFilename` - Name of the database where the information will be stored (default `'subspace.db'`)
- `callInterval` - Interval of time in milliseconds to query a contract/address to determine changes in state or balance (default: `undefined`. Obtains data every block).


## Reacting to data
Once it's initialized, you can use **Subspace**'s methods to track the contract state, events and balances. These functions return RxJS Observables which you can subscribe to, and obtain and transform the observed data via operators.

::: tip What is an Observable?
The `Observable` type can be used to model push-based data sources such as DOM events, timer intervals, and sockets. In addition, observables are:
- Compositional: Observables can be composed with higher-order combinators.
- Lazy: Observables do not start emitting data until an observer has subscribed.
:::

#### Further read
- [RxJS Observables](https://rxjs-dev.firebaseapp.com/guide/observable)


### Tracking a contract's state
You can track changes to the contract state, by specifying the view function and arguments to call and query the contract. 
```js
const contractObject = ...; // A web3.eth.Contract object initialized with an address and ABI.
const functionName = "..."; // string containing the name of the contract's constant/view function to track.
const functionArgs = []; // array containing the arguments of the function to track. Optional
const callOptions = {from: web3.eth.defaultAccount}; //  Options used for calling. Only `from`, `gas` and `gasPrice` are accepted. Optional

const myObservable$ = subspace.trackProperty(contractObject, functionName, functionArgs, callOptions);
```

::: tip Tracking the public variables of a contract
State variables implicity create a `view` function when they're defined as `public`. The `functionName` would be the same as the variable name, and `functionArgs` would have a value when the type is a `mapping` or `array` (since these require an index value to query them).
:::


### Tracking contract events
You can track events and react to their returned values.
```js
const contractObject = ...; // A web3.eth.Contract object initialized with an address and ABI.
const eventName = "..."; // string containing the name of the event to track.
const options = { filter: { }, fromBlock: 1 }; // options used to query the events. Optional

const myEventObservable$ = subspace.trackEvent(contractObject, eventName, options)

```



### Tracking balances of addresses
You can also track changes in both ETH and ERC20 token balances for each mined block or time interval depending on the `callInterval` configured. 

```js
// Tracking ETH balance
const address = "0x0001020304050607080900010203040506070809";

subspace
  .trackBalance(address)
  .subscribe((balance) => {
    console.log("ETH balance is ", balance)
  });
```

```js
// Tracking ERC20 balance
const address = "0x0001020304050607080900010203040506070809";
const tokenAddress = "0x744d70fdbe2ba4cf95131626614a1763df805b9e"; // SNT Address

const myBalanceObservable$ = subspace.trackBalance(address, tokenAddress);
```
::: warning 
Balances are returned as a string containing the value in *wei*.
:::

## Subscriptions
Once you have an `Observable`, you may receive a stream of data by creating a subscription.Subscriptions are triggered each time an observable emits a new value. These subscription receive a callback that must have a parameter which represents the value received from the observable (a contract state variable, an event, or the balance of an address);  and they return an object representing the subscription.

Subscriptions can be disposed by executing the method `unsubscribe()` liberating the resource held by it:

```js
const myBalanceObservable$ = subspace.trackBalance(address, tokenAddress);
const subscription = myBalanceObservable$.subscribe(value => { 
  console.log("The balance is: ", value); 
});

// ...

subscription.unsubscribe();
```

#### Further read
- [RxJS Subscriptions](https://rxjs-dev.firebaseapp.com/guide/subscription)


## Cleanup
If **Subspace** is not needed anymore, you need can invoke `close()` to dispose and perform the cleanup necessary to remove the internal subscriptions and interval timers created by **Subspace** during its normal execution, thus avoiding any potential memory leak.

```
subspace.close();
```
::: warning What about subscriptions created with our observables?
Any subscription created via the tracking methods must be unsubscribed manually (in the current version).
:::

