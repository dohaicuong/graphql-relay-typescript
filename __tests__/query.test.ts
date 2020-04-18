import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server'
import { options } from '../src/server'

it('fetch a single post', async () => {
  const mockPrisma = {
    post: {
      findOne: () => ({ id: 1, title: 'dkm', content: 'dkm too' })
    }
  }

  const server = new ApolloServer({
    ...options,
    context: {
      ...options.context,
      prisma: mockPrisma
    }
  })

  const { query } = createTestClient(server)

  const res = await query({
    query: `
      query PostQuery($id: ID!) {
        post(id: $id) {
          id
          title
          content
        }
      }
    `,
    variables: { id: 1 }
  })
  expect(res).toMatchSnapshot()
})