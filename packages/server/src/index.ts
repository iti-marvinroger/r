import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
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

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
