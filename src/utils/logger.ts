import * as log4js from "log4js"
import AppConfig from "../config"

export function Logger(name: string) {
  const logger = log4js.getLogger(`[${name}]`)
  logger.level = AppConfig.log4js.level

  return logger
}
