import * as mongoose from "mongoose"
import AppConfig from "../config"
import { getLogger } from "log4js"

const logger = getLogger("[MONGODB]")

export function initDB() {
  mongoose.connect(buildConnectionUrl())
  const connection = mongoose.connection

  connection.on("error", (error) => {
    logger.error("mongodb error:", error)
  })
  connection.on("connected", () => {
    logger.debug("mongodb connected")
  })
  connection.on("disconnected", () => {
    logger.warn("mongodb disconnected")
  })

  return connection
}

function buildConnectionUrl() {
  const dbconfig = AppConfig.mongo
  const ret = ["mongodb://"]
  if (dbconfig.password) {
    ret.push(dbconfig.user, ":", dbconfig.password, "@")
    ret.push(":", dbconfig.password)
  }
  ret.push(dbconfig.host, "/")
  ret.push(dbconfig.database)
  return ret.join("")
}
