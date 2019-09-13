import { buildSchema } from 'graphql'

module.exports = buildSchema(`
    scalar Date

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        status: String!
        verified: Boolean
        resetToken: String
        resetTokenExpiration: Date
        authId: String
        posts: [Post!]
    }    

    type Post {
        _id: ID!
        title: String!
        imageUrl: String!
        content: String!
        creator: User!
        comment: Comment!
    }

    type Comment {
        comment: String!
        commenter: String!
        post: Post!
    }

    type AuthData {
        userId: String!
        token: String!
    }

    input UserInputData {
        name: String!
        email: String!
        password: String!
        confirmedPassword: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        verifyUser(authId: String!): Boolean!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        updateUser(id: ID!, userInput: UserInputData): User!
        resetPassword(email: String!): Boolean!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)