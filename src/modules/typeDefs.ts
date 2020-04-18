import { gql } from 'apollo-server'

export default gql`
  type Query {
    post(id: ID!): Post
  }

  type Mutation {
    postCreate(input: PostCreateInput!): PostCreatePayload
  }

  input PostCreateInput {
    title: String
    content: String
  }
  type PostCreatePayload {
    post: Post
  }

  type Post {
    id: ID!
    title: String
    content: String

    comments: [Comment!]
  }

  type Comment {
    id: ID!
    content: String
  }
`