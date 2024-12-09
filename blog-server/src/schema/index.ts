export const typeDefs = `#graphql
    type Query {
        users: [User]
    }

    type Mutation {
        signup(
            name: String!,
            email: String!,
            password: String!,
            bio: String ): User 
    }

    type Post{
        id: ID!
        title: String
        content: String
        author: User
    }

    type User {
        id: ID!
        name: String
        email: String
        post: Post
        profile: Profile
    }

    type Profile{
        id: ID!
        bio: String
        user: User
    }

`;
