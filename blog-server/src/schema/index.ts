export const typeDefs = `#graphql
    type Query {
        me(id:String!): UserResponse
        users: [User]
    }

    type UserResponse {
        message: String
        data: User
    }

    type Mutation {
        signup(
            name: String!,
            email: String!,
            password: String!,
            bio: String
            ): AuthPayload
            
        signin(
        email: String,
        password: String
        ): AuthPayload

        createPost(
            title: String!,
            content: String!,
            authorId: String!,
        ): Post
    }

    type AuthPayload{ 
        message: String
        token: String        
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
