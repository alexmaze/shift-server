import * as mongoose from "mongoose"
import AppConfig from "../config"

mongoose.connect(buildConnectionUrl())

export const connection = mongoose.connection

connection.on("error", (error) => {
  console.error("数据库错误:", error)
})
connection.on("connected", () => {
  console.log("数据库连接成功")
})
connection.on("disconnected", () => {
  console.log("数据库断开连接")
})

function buildConnectionUrl() {
  const dbconfig = AppConfig.mongo
  const ret = ["mongodb://"]
  ret.push(dbconfig.user, ":", dbconfig.password, "@")
  ret.push(dbconfig.host, "/")
  ret.push(dbconfig.database)
  return ret.join("")
}
