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
    mode: string
    pool: number
    timeout: number
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

let config: IAppConfig = require("./application.json")
if (process.env.NODE_ENV === "development") {
  config = require("./application.development.json")
}

export default config
