import { Photon } from "@prisma/photon";
import { ApolloServer, gql } from "apollo-server";
import dateScalar from "./scalars/date";

const photon = new Photon();

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
    allFlights(date: Date!): [Flight!]!
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
  ...dateScalar,
  Query: {
    allFlights: async (parent: any, args: any, context: any) => {
      const flights = await photon.flights.findMany({
        where: { date: args.date }
      });

      return flights.map(flight => ({
        id: flight.id,
        origin: flight.origin,
        destination: flight.destination,
        availableSeats: []
      }));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function main() {
  await photon.connect();

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main().catch(e => console.error(e));
