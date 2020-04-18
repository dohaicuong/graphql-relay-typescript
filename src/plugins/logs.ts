import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { Logger } from 'winston'

const createPlugin = (logger: Logger): ApolloServerPlugin => {
  return {
    requestDidStart: ({ request, context }) => {
      if (request.operationName !== 'IntrospectionQuery') {
        const operationName = request.operationName || request.query || ''
        logger.info({
          operation: operationName,
          info: request.query
        })

        return {
          // parsingDidStart: ({ request }) => {
          //   logger.info(`${request.operationName} - parsing start`)
          // },
          // validationDidStart: ({ request }) => {
          //   logger.info(`${request.operationName} - validation start`)
          // },
          // didResolveOperation: ({ request }) => {
          //   logger.info(`${request.operationName} - resolve operation`)
          // },
          // responseForOperation: ({ request }) => {
          //   logger.info(`${request.operationName} - response operation`)
          //   return null
          // },
          // executionDidStart: ({ operationName }) => {
          //   logger.info(`${request.operationName} - execute`)
          // },
          didEncounterErrors: ({ errors }) => {
            logger.error({
              operation: operationName, info: errors
            })
          },
          willSendResponse: ({ response }) => {
            logger.info({
              operation: operationName, info: response
            })
          },
        }
      }
    },
  }
}
export default createPlugin