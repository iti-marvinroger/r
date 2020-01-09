import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const parseDate = (candidate: string) => {
  const parsed = new Date(candidate);

  if (isNaN(parsed.getTime())) {
    throw new Error("Invalid date");
  }

  return parsed;
};

export default {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "A date",
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
  })
};
