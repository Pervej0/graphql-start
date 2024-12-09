import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },

  Mutation: {
    signup: async (parent: any, args: any, context: any) =>
      await prisma.user.create({ data: args }),
  },
};
