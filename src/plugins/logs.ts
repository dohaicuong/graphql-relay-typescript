import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { Logger } from 'winston'

const createPlugin = (logger: Logger): ApolloServerPlugin => {
  return {
    requestDidStart: ({ request }) => {
      if (request.operationName !== 'IntrospectionQuery') {
        const operationName = request.operationName || ''
        logger.info(operationName, request.query)

        return {
          parsingDidStart: ({ request }) => {
            logger.info(`${request.operationName} - parsing start`)
          },
          validationDidStart: ({ request }) => {
            logger.info(`${request.operationName} - validation start`)
          },
          didResolveOperation: ({ request }) => {
            logger.info(`${request.operationName} - resolve operation`)
          },
          responseForOperation: ({ request }) => {
            logger.info(`${request.operationName} - response operation`)
            return null
          },
          executionDidStart: ({ operationName }) => {
            logger.info(`${request.operationName} - execute`)
          },
          didEncounterErrors: ({ operationName, errors }) => {
            logger.error(`${operationName} - ${JSON.stringify(errors)}`)
          },
          willSendResponse: ({ response }) => {
            logger.info(`${operationName} - ${JSON.stringify(response)}`)
          },
        }
      }
    },
  }
}
export default createPlugin