import { Flight, FlightRule } from "@prisma/photon";
import { Context } from "../context";

interface AvailableFlight {
  id: string;
  origin: string;
  destination: string;
  seats: {
    [classType: string]: { price: number; available: number; total: number };
  };
}

export const getAvailableFlights = async (
  ctx: Context,
  date: Date
): Promise<AvailableFlight[]> => {
  // FIXME: prisma does not support group by...
  const flightRules = await (await ctx.photon.flightRules.findMany()).reduce(
    (acc, rule) => {
      acc.set(rule.flightId, rule);

      return acc;
    },
    new Map<string, FlightRule>()
  );

  const flights = await ctx.photon.flights.findMany({
    where: { date },
    include: { seats: true, rule: true }
  });

  const availableFlights = new Map<string, AvailableFlight>();

  for (const rule of flightRules.values()) {
    availableFlights.set(rule.flightId, {
      id: rule.flightId,
      origin: rule.origin,
      destination: rule.destination,
      seats: {
        ECO: {
          price: rule.ecoInitialPrice,
          available: rule.ecoSeats,
          total: rule.ecoSeats
        },
        BUSINESS: {
          price: rule.businessInitialPrice,
          available: rule.businessSeats,
          total: rule.businessSeats
        }
      }
    });
  }

  // here, available flights contains state if no seats are booked

  for (const flight of flights) {
    const flightId = flight.rule.flightId;

    const availableFlight = availableFlights.get(flightId)!;
    const noBookings = flight.seats.length === 0;

    if (noBookings) {
      continue;
    }

    ["ECO", "BUSINESS"].map(classType => {
      const maxSeats =
        classType === "ECO" ? flight.rule.ecoSeats : flight.rule.businessSeats;
      const ratio =
        classType === "ECO"
          ? flight.rule.ecoNextPriceRatio
          : flight.rule.businessNextPriceRatio;
      const initialPrice =
        classType === "ECO"
          ? flight.rule.ecoInitialPrice
          : flight.rule.businessInitialPrice;
      const seatsBooked = flight.seats.filter(seat => seat.class === classType)
        .length;

      availableFlight.seats[classType].available = maxSeats - seatsBooked;

      if (seatsBooked === 0) {
        return;
      }

      if (seatsBooked === maxSeats) {
        delete availableFlight.seats[classType];

        return;
      }

      // there are seats booked, but some are still available
      // let's apply the ratio

      const price = Math.ceil(
        initialPrice * Math.pow(1 + 0.01 * ratio, seatsBooked)
      );

      availableFlight.seats[classType].price = price;
    });

    if (Object.keys(availableFlight.seats).length === 0) {
      availableFlights.delete(flightId);
    }
  }

  return Array.from(availableFlights.values());
};

type SeatAvailability =
  | { available: false }
  | { available: true; price: number };

export const getSeatAvailability = async (
  ctx: Context,
  opts: { date: Date; flightId: string; price: number; classType: string }
): Promise<SeatAvailability> => {
  const flight = await (await getAvailableFlights(ctx, opts.date)).find(
    flight => flight.id === opts.flightId
  );

  if (!flight) {
    return { available: false };
  }

  const seat = flight.seats[opts.classType];

  if (!seat) {
    return { available: false };
  }

  return { available: true, price: seat.price };
};

export const bookFlight = async (
  ctx: Context,
  opts: {
    date: Date;
    flightId: string;
    price: number;
    classType: string;
    name: string;
  }
) => {
  const flightAvailability = await getSeatAvailability(ctx, opts);

  if (!flightAvailability.available) {
    return false;
  }

  if (flightAvailability.price !== opts.price) {
    return false;
  }

  const existingFlight = await ctx.photon.flights.findMany({
    where: { date: opts.date, rule: { flightId: opts.flightId } }
  });

  let flight: Flight;
  if (existingFlight.length === 0) {
    const latestRule = await ctx.photon.flightRules.findMany({
      last: 1,
      where: { flightId: opts.flightId }
    });

    flight = await ctx.photon.flights.create({
      data: { date: opts.date, rule: { connect: { id: latestRule[0].id } } }
    });
  } else {
    flight = existingFlight[0];
  }

  await ctx.photon.seats.create({
    data: {
      class: opts.classType as any,
      name: opts.name,
      flight: { connect: { id: flight.id } }
    }
  });

  return true;
};
