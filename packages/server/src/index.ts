import { Photon } from "@prisma/photon";
import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import * as path from "path";
import { migrate } from "./migrate";
import * as allTypes from "./schema";

const schema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, "../src/generated/schema.graphql"),
    typegen: path.join(__dirname, "../src/generated/nexus-types.ts")
  },
  typegenAutoConfig: {
    sources: [
      { source: path.resolve(__dirname, "../src/context.ts"), alias: "ctx" }
    ],
    contextType: "ctx.Context"
  }
});

const photon = new Photon();

const server = new ApolloServer({ schema, context: { photon } });

async function main() {
  await photon.connect();

  await migrate(photon);

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

main().catch(e => console.error(e));
