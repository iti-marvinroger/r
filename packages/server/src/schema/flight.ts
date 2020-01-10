import { arg, enumType, extendType, objectType } from "nexus";
import * as flightService from "../services/flight";
import { DateScalar } from "./scalar";
import { Seat } from "./seat";

export const AvailableFlight = objectType({
  name: "AvailableFlight",
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
    t.list.field("allAvailableFlights", {
      type: AvailableFlight,
      args: {
        date: arg({ type: DateScalar, nullable: false })
      },
      async resolve(root, args, ctx) {
        const availableFlights = await flightService.getAvailableFlights(
          ctx,
          args.date
        );

        return availableFlights.map(flight => ({
          id: flight.id,
          origin: flight.origin,
          destination: flight.destination,
          availableSeats: Object.entries(flight.seats).map(seat => ({
            class: seat[0] as any,
            price: seat[1].price
          }))
        }));
      }
    });
  }
});
