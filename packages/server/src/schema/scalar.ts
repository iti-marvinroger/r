import { Kind } from "graphql";
import { scalarType } from "nexus";

const parseDate = (candidate: string) => {
  const parsed = new Date(candidate);

  if (isNaN(parsed.getTime())) {
    throw new Error("Invalid date");
  }

  return parsed;
};

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "A date",
  rootTyping: "Date",
  parseValue(value) {
    if (typeof value !== "string") {
      throw new Error("Invalid date");
    }

    return parseDate(value);
  },
  serialize(value: Date) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error("Invalid date");
    }

    return parseDate(ast.value);
  }
});
