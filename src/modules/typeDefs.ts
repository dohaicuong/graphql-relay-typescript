import { gql } from 'apollo-server'

export default gql`
  type Query {
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