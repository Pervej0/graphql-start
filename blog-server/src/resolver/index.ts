import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { jwtHelper } from "../utils/jwtHelper";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    me: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: { id: Number(args.id) },
      });

      if (!user) {
        return { message: "User dose not exist!", data: null };
      }
      return {
        message: "user retrieved successfully!",
        data: user,
      };
    },
  },

  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      const hashedPass = await bcrypt.hash(args.password, 12);
      args.password = hashedPass;

      const user = await prisma.user.create({ data: args });
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwtHelper(payload, config.SECRET_KEY as string);

      if (args.bio) {
        await prisma.profile.create({
          data: { bio: args.bio, userId: user.id },
        });
      }

      return {
        message: "Registered Successfully!",
        token,
      };
    },

    signin: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email: args.email },
      });

      const isPasswordMatched = await bcrypt.compare(
        args.password,
        user.password
      );
      if (!isPasswordMatched) {
        return {
          message: "Password doesn't matched!",
          token: null,
        };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = jwtHelper(payload, config.SECRET_KEY as string);

      return {
        message: "login Successfully!",
        token,
      };
    },

    createPost: async (parent: any, args: any, context: any) => {
      args.authorId = Number(args.authorId);
      const post = await prisma.post.create({ data: args });

      return post;
    },
  },
};
