import { ApolloServer } from 'apollo-server'

import schema from './modules'

import createLogPlugin from './plugins/logs'
import winston, { format } from 'winston'
const { combine, timestamp, label, printf, colorize } = format
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    label({ label: 'graphql-service' }),
    timestamp(),
    printf(({ level, label, message, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`)
  ),
  transports: [
    // new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.Console(),
  ]
})

export type Context = {
  req: any
  logger: winston.Logger
}

export default new ApolloServer({
  schema,
  context: ({ req }: any) => {
    return {
      req,
      logger
    }
  },
  plugins: [
    createLogPlugin(logger)
  ]
})