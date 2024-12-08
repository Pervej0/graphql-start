import { db } from "../../db";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) =>
      db.products.find((item: any) => item.id === args.productId),
    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) =>
      db.categories.find((item: any) => item.id === args.categoryId),
  },

  Product: {
    category: ({ categoryId }: any, args: any, context: any) =>
      db.categories.find((category) => category.id === categoryId),

    review: (parent: any, args: any, context: any) =>
      db.reviews.filter((review) => review.productId === parent.id),
  },

  Category: {
    product: (parent: any, args: any, context: any) =>
      db.products.filter((product) => product.categoryId === parent.id),
  },
};
