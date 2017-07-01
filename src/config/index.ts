import { join } from "path"

type LoggerLevel = "info" | "error" | "debug"

interface IAppConfig {
  name: string
  server: {
    port: number
    public: string
    address: string
  }
  logger: {
    config: string
    level: LoggerLevel
  }
  mongo: {
    host: string
    user: string
    password: string
    database: string
  }
  session: {
    secret: string
    cookie: {
      maxAge: number
      httpOnly: boolean
    }
    resave: boolean
    name: string
    saveUninitialized: boolean
  }
}

const prodConfigPath = join(__dirname, "../../config/application.json")
const devConfigPath = join(__dirname, "../../config/application.development.json")

let config: IAppConfig = require(prodConfigPath)
if (process.env.NODE_ENV === "development") {
  console.log("Using development configuration.")
  config = require(devConfigPath)
}

export default config
