import * as mongoose from "mongoose"

mongoose.connect("mongodb://localhost/iroom")

export const connection = mongoose.connection
connection.on("error", console.error.bind(console, "connection error:"))
connection.once("open", () => {
  console.log("数据库连接成功")
})
