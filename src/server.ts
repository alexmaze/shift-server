import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as logger from "morgan"
import * as path from "path"

import AppConfig from "./config"
import { AuthMiddleware, SessionMiddleware } from "./middlewares"
import { SessionController } from "./controllers/session"

const app = express()
app.disable("x-powered-by")

// 第三方中间件
app.use(express.static(path.join(__dirname, AppConfig.server.public)))
app.use(logger(AppConfig.logger.config))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cookieParser())

// 中间件
app.use(SessionMiddleware)
app.use(AuthMiddleware)

// 路由
app.use("/api/session", SessionController)
// app.use("/api/user", require("./routes/user").default)
// app.use("/api/project", require("./routes/project").default)
// app.use("/api/hardware", require("./routes/hardware").default)

// 启动
const { port, address } = AppConfig.server
app.listen(port, address, () => {
  console.log(`${AppConfig.name} is running @${address}:${port}`)
})
