import {
  QueryResolvers,
  PostResolvers,
  CommentResolvers
} from 'gen-types'

type Resolvers = {
  Query: QueryResolvers
  Post?: PostResolvers
  Comment?: CommentResolvers
}

const resolvers: Resolvers = {
  Query: {
    post: (_, __, { prisma, logger }) => {
      return {
        id: '1',
        title: 'dkm',
        content: 'yeah'
      }
    }
  },
  Post: {
    comments: () => {
      return [
        { id: '1', content: 'yeah 1' },
        { id: '2', content: 'yeah 2' },
        { id: '3', content: 'yeah 3' },
      ]
    }
  }
}

export default resolvers