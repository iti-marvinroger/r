import { Photon } from "@prisma/photon";

interface FlightRule {
  id: number;
  origin: string;
  destination: string;
  business: {
    initial: number;
    seats: number;
    ratio: number;
  };
  eco: {
    initial: number;
    seats: number;
    ratio: number;
  };
}

// TODO: when prisma2 supports seeding, migrate to that
export const migrate = async (photon: Photon) => {
  const numberOfRules = await photon.flightRules.count();

  if (numberOfRules === 0) {
    const toCreate: FlightRule[] = [
      {
        id: 1,
        origin: "DTW",
        destination: "CDG",
        business: { initial: 200000, seats: 30, ratio: 3 },
        eco: { initial: 30000, seats: 200, ratio: 3 }
      },
      {
        id: 1,
        origin: "DTW",
        destination: "JFK",
        business: { initial: 80000, seats: 10, ratio: 3 },
        eco: { initial: 10000, seats: 150, ratio: 3 }
      },
      {
        id: 1,
        origin: "CDG",
        destination: "JFK",
        business: { initial: 300000, seats: 40, ratio: 3 },
        eco: { initial: 40000, seats: 300, ratio: 3 }
      }
    ];

    for (const rule of toCreate) {
      const creation = [
        [rule.origin, rule.destination],
        [rule.destination, rule.origin]
      ].map(coords => {
        const [origin, destination] = coords;

        return photon.flightRules.create({
          data: {
            flightId: `${origin}-${destination}_${rule.id}`,
            origin,
            destination,
            businessInitialPrice: rule.business.initial,
            businessSeats: rule.business.seats,
            businessNextPriceRatio: rule.business.ratio,
            ecoInitialPrice: rule.eco.initial,
            ecoSeats: rule.eco.seats,
            ecoNextPriceRatio: rule.eco.ratio
          }
        });
      });

      await Promise.all(creation);
    }
  }
};
