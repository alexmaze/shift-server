import { getLogger } from "log4js"
import * as onHeaders from "on-headers"
import * as onFinished from "on-finished"

const logger = getLogger("[HTTP]")

export function HttpLogMiddleware(req, res, next) {
  logger.debug("in http log mid")
  // request data
  req._startAt = undefined
  req._startTime = undefined
  req._remoteAddress = getip(req)

  // response data
  res._startAt = undefined
  res._startTime = undefined

  // record request start
  recordStartTime.call(req)

  // record response start
  onHeaders(res, recordStartTime)

  // log when response finished
  onFinished(res, logRequest)

  next()
}

/**
 * Record the start time.
 * @private
 */
function recordStartTime() {
  this._startAt = process.hrtime()
  this._startTime = new Date()
}

/**
 * Get request IP address.
 *
 * @private
 * @param {IncomingMessage} req
 * @return {string}
 */
function getip(req) {
  return req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined
}

function logRequest() {
  logger.info("hello")
}
