import server from './server'
import { PORT } from './configs'

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(url))