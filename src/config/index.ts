import { join } from "path"
import { getLogger } from "log4js"

const logger = getLogger("[CONFIG]")

const prodConfigPath = join(__dirname, "../../config/application.json")
const devConfigPath = join(__dirname, "../../config/application.development.json")

let config: IAppConfig = require(prodConfigPath)
if (process.env.NODE_ENV === "development") {
  logger.debug("Using development configuration.")
  config = require(devConfigPath)
}

export default config
interface IAppConfig {
  name: string
  server: {
    port: number
    public: string
    address: string
  }
  morgan: string
  log4js: {
    level: string
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
