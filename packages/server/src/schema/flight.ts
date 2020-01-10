import { arg, enumType, extendType, objectType } from "nexus";
import { DateScalar } from "./scalar";
import { Seat } from "./seat";

export const Flight = objectType({
  name: "Flight",
  definition(t) {
    t.id("id");
    t.string("origin");
    t.string("destination");

    t.list.field("availableSeats", { type: Seat });
  }
});

export const ClassEnum = enumType({
  name: "ClassEnum",
  members: ["ECO", "BUSINESS"]
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allFlights", {
      type: Flight,
      args: {
        date: arg({ type: DateScalar, nullable: false })
      },
      async resolve(root, args, ctx) {
        // await ctx.photon.flights.create({
        //   data: {
        //     origin: "CDG",
        //     destination: "JFK",
        //     date: new Date("2020-01-20"),
        //     businessInitialPrice: 100000,
        //     businessNextPriceRatio: 3,
        //     businessSeats: 2,
        //     ecoInitialPrice: 30000,
        //     ecoNextPriceRatio: 3,
        //     ecoSeats: 100
        //   }
        // });

        const flights = await ctx.photon.flights.findMany({
          where: { date: args.date }
        });

        return flights.map(flight => ({
          id: flight.id,
          origin: flight.origin,
          destination: flight.destination,
          availableSeats: []
        }));
      }
    });
  }
});
