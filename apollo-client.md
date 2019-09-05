```js
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, Query } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import Phoenix from "phoenix";
import Web3 from "web3";
import { makeExecutableSchema } from "graphql-tools";
import PhoenixRxLink from "./phoenix-rx-link";

const MY_QUERY = gql`
  query {
    escrows {
      escrowId
    }
  }
`;

 const eventSyncer = new Phoenix(web3.currentProvider);

      await eventSyncer.init();

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
            return eventSyncer.trackEvent(this.EscrowContract, "Created", {
              filter: { buyer: accounts[0] },
              fromBlock: 1
            });
          }
        }
      };

      const schema = makeExecutableSchema({
        typeDefs,
        resolvers
      });

      const client = new ApolloClient({
        // If addTypename:true, the query will fail due to __typename
        // being added to the schema. reactive-graphql does not
        // support __typename at this moment.
        cache: new InMemoryCache({ addTypename: false }),
        link: PhoenixRxLink(schema)
      });

      this.setState({ client });

      <ApolloProvider client={this.state.client}>
        <Query query={MY_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) {
              console.error(error);
              return <div>Error :(</div>;
            }
            return (
              <p>The data returned by the query: {JSON.stringify(data)}</p>
            );
          }}
        </Query>
      </ApolloProvider>
```