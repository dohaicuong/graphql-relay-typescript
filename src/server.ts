import { ApolloServer } from 'apollo-server'

import schema from './modules'

import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

import createLogPlugin from './plugins/logs'
import winston, { format } from 'winston'
import { SERVICE_NAME } from './configs'
const logger = winston.createLogger({
  level: 'error',
  format: format.combine(
    format.colorize(),
    format.prettyPrint(),
    format.splat(),
    format.simple(),
    format.label({ label: SERVICE_NAME }),
    format.timestamp(),
    format.printf(({ timestamp, label, level, message }) => {
      // @ts-ignore
      return `${timestamp} [${label}] ${level}: ${message.operation} - ${JSON.stringify(message.info, null, 4)}`
    })
  ),
  transports: [
    // new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.Console(),
  ]
})

export type Context = {
  req: any
  logger: winston.Logger
  prisma: PrismaClient
}

export const options = {
  schema,
  context: ({ req }: any) => {
    return {
      req,
      logger,
      prisma
    }
  },
  plugins: [
    createLogPlugin(logger)
  ]
}

export default new ApolloServer(options)