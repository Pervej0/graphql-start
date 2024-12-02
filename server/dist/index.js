"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const db_1 = __importDefault(require("./db"));
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
        books: () => db_1.default.books,
        book: (parent, args, context) => db_1.default.books.find((item) => item.id === args.bookId),
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
});
main();
