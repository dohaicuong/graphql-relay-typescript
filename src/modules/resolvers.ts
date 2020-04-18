import {
  QueryResolvers,
  MutationResolvers,
  PostResolvers,
  CommentResolvers
} from 'gen-types'

type Resolvers = {
  Query: QueryResolvers
  Mutation?: MutationResolvers
  Post?: PostResolvers
  Comment?: CommentResolvers
}

const resolvers: Resolvers = {
  Query: {
    post: (_, { id }, { prisma, logger }) => {
      return prisma.post.findOne({ where: { id }})
    }
  },
  Mutation: {
    postCreate: async (_, { input }, { prisma }) => {
      const post = await prisma.post.create({ data: input })
      return { post }
    }
  },
  Post: {
    comments: (post, __, { prisma }) => {
      return prisma.post.findOne({ where: { id: post.id }}).comments()
    }
  }
}

export default resolvers