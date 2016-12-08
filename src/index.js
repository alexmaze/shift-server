import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import logger from 'morgan'
import session from 'express-session'
import path from 'path'
import fs from 'fs-extra'

import { db } from './db'
import { auth } from './middlewares/auth'

const PORT = 4000

const app = express()
const upload = multer()

app.disable('x-powered-by')

// // trust first proxy
// app.set('trust proxy', 1)

// 中间件
app.use(express.static(path.join(__dirname, '../public')))
app.use(logger('[:date[iso]] :method :url :status :response-time ms - :res[content-length] :remote-addr'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cookieParser())

const sessionRouter = session({
  secret: 'eWG*9%vlX^5hkaUm4Jnz^3gwV63d18BP',
  cookie: { maxAge: 60 * 1000 * 60 * 2 },
  resave: true,
  saveUninitialized: true
})
app.use('/api/user', sessionRouter)
app.use('/api/project', sessionRouter)
app.use('/api/session', sessionRouter)

// 授权检测
app.use(auth)

app.use('/api/user', require('./routes/user').default)
app.use('/api/project', require('./routes/project').default)
app.use('/api/session', require('./routes/session').default)
app.use('/api/hardware', require('./routes/hardware').default)

// 启动
app.listen(PORT, () => {
  console.log('server is listening @', PORT)
})
