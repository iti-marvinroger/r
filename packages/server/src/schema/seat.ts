import { objectType } from "nexus";
import { ClassEnum } from "./flight";

export const Seat = objectType({
  name: "Seat",
  definition(t) {
    t.field("class", { type: ClassEnum });
    t.int("price");
    t.int("available");
    t.int("total");
  }
});
