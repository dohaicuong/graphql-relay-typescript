import {
  QueryResolvers,
  PostResolvers
} from '../gen-types'

type Resolvers = {
  Query: QueryResolvers
  Post?: PostResolvers
}

const resolvers: Resolvers = {
  Query: {
    post: () => {
      return {
        id: '1',
        title: 'dkm',
        content: 'yeah'
      }
    }
  },
  Post: {
    comments: () => {
      throw new Error('dkm')

      return [
        { id: '1', content: 'yeah 1' },
        { id: '2', content: 'yeah 2' },
        { id: '3', content: 'yeah 3' },
      ]
    }
  }
}

export default resolvers