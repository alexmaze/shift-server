import * as session from "express-session"
import * as connectMongo from "connect-mongo"

import { connection } from "../db"
import AppConfig from "../config"

const MongoStore = connectMongo(session)
export const SessionMiddleware = session({
  ...AppConfig.session,
  store: new MongoStore({ mongooseConnection: connection })
})
