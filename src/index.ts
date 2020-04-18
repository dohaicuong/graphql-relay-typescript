import server, { prisma } from './server'
import { PORT } from './configs'

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(url))
  .finally(() => {
    prisma.disconnect()
  })