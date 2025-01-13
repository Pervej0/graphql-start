export const Query = {
  users: (parent: any, args: any, { prisma }: any) => prisma.user.findMany(),
  me: async (parent: any, args: any, { prisma }: any) => {
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
};
