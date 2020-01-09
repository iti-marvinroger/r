"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  scalar Date

  type Flight {
    id: ID!
    origin: String!
    destination: String!

    availableSeats: [Seat!]!
  }

  enum Class {
    ECO
    BUSINESS
  }

  type Seat {
    class: Class!
    price: Int!
  }

  type Query {
    allFlights(date: String!): [Flight!]!
  }
`;
const flights = [
    {
        id: "foo",
        origin: "CDG",
        destination: "JFK",
        availableSeats: [{ class: "ECO", price: 30000 }]
    },
    {
        id: "bar",
        origin: "JFK",
        destination: "CDG",
        availableSeats: [{ class: "BUSINESS", price: 90000 }]
    }
];
const resolvers = {
    Query: {
        allFlights: () => flights
    }
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
