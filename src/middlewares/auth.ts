import { getLogger } from "log4js"

const logger = getLogger("middleware auth")

export function AuthMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    logger.debug("login user", req.session.user.name)
  }
  next()
}
