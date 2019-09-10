# reactive-graphql

Using `reactive-graphql` you can execute GraphQL queries against Phoenix observables after you create your own type definitions and resolvers.

### Example


```js
const Phoenix = require('phoenix');
const MyContract = require('./MyContract');
const { pluck } = require('rxjs/operators');
const { makeExecutableSchema } = require("graphql-tools");
const gql = require("graphql-tag");
const { graphql } = require("reactive-graphql");

const run = async () => {
  const eventSyncer = new Phoenix(web3.currentProvider); // Use a valid websocket provider (geth, parity, infura...)
  await eventSyncer.init();

  const MyContractInstance = ...; // TODO: obtain a web3.eth.contract instance

  const typeDefs = `
    type MyEvent {
      someValue: Int
      anotherValue: String
    }
    type Query {
      myEvents: MyEvent!
    }
  `;

  const resolvers = {
    Query: {
      myEvents: () => {
        return eventSyncer.trackEvent(MyContractInstance, 'MyEvent', { filter: {}, fromBlock: 1 })
      }
    }
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const query = gql`
    query {
      myEvents {
        someValue
        anotherValue
      }
    }
  `;

  const stream = graphql(schema, query).pipe(pluck('data', 'myEvents'));
  stream.subscribe(data => {
    console.log(data);
  })

}

run();
```

::: tip 
This example is available in [Github](https://github.com/status-im/phoenix/tree/master/examples/reactive-graphql)
:::