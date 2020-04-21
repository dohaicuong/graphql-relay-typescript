import { gql } from 'apollo-server'

export default gql`
  interface Node { id: ID! }
  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }

  type Post implements Node {
    id: ID!
    title: String
    content: String

    comments: [Comment!]
  }

  type Comment implements Node {
    id: ID!
    content: String
  }

  type Query {
    node(id: ID!): Node
    posts(
      first: Int!
      after: String
    ): PostConnection
  }

  type PostConnection {
    edges: [PostEdge!]
    pageInfo: PageInfo!
  }

  type PostEdge {
    cursor: String
    node: Post
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
`