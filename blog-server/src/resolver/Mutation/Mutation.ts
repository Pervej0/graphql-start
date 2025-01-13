import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHelper } from "../../utils/jwtHelper";

export const Mutation = {
  signup: async (parent: any, args: any, { prisma }: any) => {
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

  signin: async (parent: any, args: any, { prisma }: any) => {
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

  createPost: async (parent: any, args: any, { prisma }: any) => {
    args.authorId = Number(args.authorId);
    const post = await prisma.post.create({ data: args });

    return post;
  },
};
