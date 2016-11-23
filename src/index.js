import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import logger from 'morgan'
import session from 'express-session'
import wrench from 'wrench'
import path from 'path'

import { db } from './db'
import { auth } from './middlewares/auth'

const PORT = 4000

const app = express()
const upload = multer()

// trust first proxy
app.set('trust proxy', 1)

// 中间件
app.use(express.static(path.join(__dirname, '../public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cookieParser())

// session 注入
app.use(session({
  secret: 'eWG*9%vlX^5hkaUm4Jnz^3gwV63d18BP',
  cookie: { maxAge: 60 * 1000 * 60 * 2 },
  resave: true,
  saveUninitialized: true
}))

// 授权检测
app.use(auth)

// 自动注册路由
wrench.readdirSyncRecursive(`${__dirname}/routes`)
  .filter((path) => (/\.(js|coffee)$/i)
  .test(path))
  .map((path) => {
    let routePrefix = path.substring(0, path.length - 3)
    console.log('Load', routePrefix, path)
    app.use(`/api/${routePrefix}`, require(`${__dirname}/routes/${path}`).default)
  })

// 启动
app.listen(PORT, () => {
  console.log('server is listening @', PORT)
})
