import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as path from "path"
import * as log4js from "log4js"

import AppConfig from "./config"
import {
  AuthMiddleware,
  SessionMiddleware,
  HttpLogMiddleware
} from "./middlewares"
import { SessionController } from "./controllers/session"
import { UserController } from "./controllers/user"
import { ProjectController } from "./controllers/project"
import { HardwareController } from "./controllers/hardware"

const logger = log4js.getLogger("[INIT]")
logger.level = AppConfig.log4js.level

const app = express()
app.disable("x-powered-by")

// 第三方中间件
app.use(express.static(path.join(__dirname, AppConfig.server.public)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// 中间件
app.use(HttpLogMiddleware)
app.use(SessionMiddleware)
app.use(AuthMiddleware)

// 路由
app.use("/api/session", SessionController)
app.use("/api/user", UserController)
app.use("/api/project", ProjectController)
app.use("/api/hardware", HardwareController)

// 启动
const { port, address } = AppConfig.server
app.listen(port, address, () => {
  logger.info(`${AppConfig.name} is running @${address}:${port}`)
})
