"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../db");
exports.resolvers = {
    Query: {
        products: () => db_1.db.products,
        product: (parent, args, context) => db_1.db.products.find((item) => item.id === args.productId),
        categories: () => db_1.db.categories,
        category: (parent, args, context) => db_1.db.categories.find((item) => item.id === args.categoryId),
    },
    Product: {
        category: ({ categoryId }, args, context) => db_1.db.categories.find((category) => category.id === categoryId),
        review: (parent, args, context) => db_1.db.reviews.filter((review) => review.productId === parent.id),
    },
    Category: {
        product: (parent, args, context) => db_1.db.products.filter((product) => product.categoryId === parent.id),
    },
};
