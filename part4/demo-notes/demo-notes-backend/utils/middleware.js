const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:\t', request.method)
  logger.info('Path:\t', request.path)
  logger.info('Body:\t', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError' ) {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }