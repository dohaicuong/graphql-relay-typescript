import { connectionFromPromisedArray } from 'graphql-relay'

import {
  QueryResolvers,
  MutationResolvers,
  PostResolvers,
  CommentResolvers,
  NodeResolvers,
} from 'gen-types'

type Resolvers = {
  Node: NodeResolvers
  Query: QueryResolvers
  Mutation?: MutationResolvers
  Post?: PostResolvers
  Comment?: CommentResolvers
}

const resolvers: Resolvers = {
  Node: {
    // @ts-ignore
    __resolveType: node => node.type,
    id: (node, __, ___, info) => `${info.parentType}_${node.id}`,
  },
  Query: {
    node: async (_, { id: typeId }, { prisma }) => {
      const [type, id] = typeId.split('_')
      // @ts-ignore
      const node = await prisma[type.toLowerCase()].findOne({ where: { id }})

      return { type, ...node }
    },
    posts: async (_, args, { prisma }) => {
      return connectionFromPromisedArray(
        prisma.post.findMany(),
        args
      )
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