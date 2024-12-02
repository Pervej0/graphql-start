import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schema";
import { resolvers } from "./gql/resolver";
import { Server } from "http";

let server: ApolloServer;
try {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
} catch (error) {
  console.log(error);
}

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
