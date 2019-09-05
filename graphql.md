# Reactive GraphQL
```js
import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";
import {graphql} from "reactive-graphql";

      const typeDefs = `
        type Escrow {
          buyer: String!
          seller: String!
          escrowId: Int!
        }
        type Query {
          escrows: Escrow!
        }
      `;

      const resolvers = {
        Query: {
          escrows: () => {
            return eventSyncer.trackEvent(this.EscrowContract, 'Created', { filter: { buyer: accounts[0] }, fromBlock: 1 })
          }
        }
      };

      
      
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const query = gql`
  query {
    escrows {
      buyer
      seller
      escrowId
    }
  }
`;

const stream = graphql(schema, query).pipe(pluck("data", "escrows"));
this.setState({
  escrow: stream
});
```