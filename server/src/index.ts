import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db";

const typeDefs = `#graphql
    type Book {
       title: String,
       author: String,
       year: Int,
       genre: String,
       rating: Float,
    }

   type Query {
    books: [Book]
    book (bookId: ID!): Book 
  }
`;

const resolvers = {
  Query: {
    books: () => db.books,
    book: (parent: any, args: { bookId: string }, context: any) =>
      db.books.find((item: any) => item.id === args.bookId),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
