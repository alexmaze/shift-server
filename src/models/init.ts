import * as mongoose from "mongoose"
import AppConfig from "../config"

export function initDB() {
  mongoose.connect(buildConnectionUrl())
  const connection = mongoose.connection

  connection.on("error", (error) => {
    console.error("数据库错误:", error)
  })
  connection.on("connected", () => {
    console.log("数据库连接成功")
  })
  connection.on("disconnected", () => {
    console.log("数据库断开连接")
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
