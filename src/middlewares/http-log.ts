import * as onHeaders from "on-headers"
import * as onFinished from "on-finished"
import { Logger } from "../utils/logger"

const logger = Logger("HTTP")

export function HttpLogMiddleware(req, res, next) {
  // request data
  req._startAt = undefined
  req._startTime = undefined
  req._remoteAddress = getIP(req)

  // response data
  res._startAt = undefined
  res._startTime = undefined

  // record request start
  recordStartTime.call(req)

  // record response start
  onHeaders(res, recordStartTime)

  // log when response finished
  onFinished(res, () => {
    doLog(req, res)
  })

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
function getIP(req) {
  return (
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined
  )
}

/**
 * log http request info
 * @param req
 * @param res
 */
function doLog(req, res) {
  const ms = 0;
  logger.info(
    `${req.method} ${req.originalUrl || req.url} ${res.statusCode} ${ms.toFixed(
      2
    )}ms - ${req._remoteAddress}`
  )
}
