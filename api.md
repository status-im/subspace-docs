# API

## General

### `new Subspace(web3Provider [, options])`
Constructor. 

**Parameters**
1. `web3Provider` - `Object`: a valid web3 websockets provider.
2. `options` - `Object` (optional): Options used to initialize Subspace
	- `dbFilename` - `String` (optional): Name of the database where the information will be stored (default `'subspace.db'`)
	- `callInterval` - `Number` (optional): - Interval of time in milliseconds to query a contract/address to determine changes in state or balance (default: `undefined`. Obtains data every block).

### `init()`
Initializes **Subspace**

**Returns**
`Promise` that once it's resolved, will mean that **Subspace** is available to use

### `close()`
Dispose and perform the cleanup necessary to remove the internal subscriptions and interval timers created by **Subspace** during its normal execution.

## Data tracking methods

### `trackEvent(contractObject, eventName [, options])`
Track a contract event.

**Parameters**
1. `contractObject` - `web3.eth.Contract`: An already initialized contract object pointing to an address and containing a valid ABI.
2. `eventName` - `String`: The name of the event to subscribe.
3. `options` - `Object` (optional): web3 filter options object to limit the number of events based on a block number range, or indexed filters
    - `filter` - `Object` (optional): Lets you filter events by indexed parameters, e.g. `{filter: {myNumber: [12,13]}}` means all events where `"myNumber"` is `12` or `13`.
    - `fromBlock` - `Number` (optional): The block number from which to get events on.
    - `toBlock` - `Number` (optional): The block number to get events up to (Defaults to `"latest"`)
    - `topics` - `Array` (optional): This allows you to manually set the topics for the event filter. If given the filter property and event signature, (`topic[0]`) will not be set automatically.

**Returns**
`RxJS Observable` which will stream the event `returnValues`.

### `trackProperty(contractObject, functionName [, functionArgs] [, callOptions])`
Track a constant function / contract state variable on each block mined, or depending on the `callInterval` option used during **Subspace** initialization.

**Parameters**
1. `contractObject` - `web3.eth.Contract`: An already initialized contract object pointing to an address and containing a valid ABI.
2. `functionName` - `String`: Name of the function or variable whose values will be tracked.
3. `functionArgs` - `Array` (optional): Array of arguments that the tracked function receives
4. `callOptions` - `Object` (optional): The options used for calling.
    - `from` - `String` (optional): The address the call “transaction” should be made from.
    - `gasPrice` - `String` (optional): The gas price in wei to use for this call “transaction”.
    - `gas` - `Number` (optional): The maximum gas provided for this call “transaction” (gas limit).

**Returns**
`RxJS Observable` which will stream the function / variable values. Data type will depend on the contract function invoked. 

### `trackBalance(address [, tokenAddress])`
Track balance changes for an address on each block mined, or depending on the `callInterval` option used during **Subspace** initialization.

**Parameters**
1. `address` - `String`: The address to get the balance of.
2. `tokenAddress` - `String` (optional): If you want to track the balance for an ERC20 contract, here you can specify the token address. Otherwise, Only ETH balances will be returned.

**Returns**
`RxJS Observable` which will stream a string containing the address balance.
