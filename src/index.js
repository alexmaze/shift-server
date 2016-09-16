/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import logger from 'morgan';
import session from 'express-session';

import projectRoute from './routes/project';
import hardwareRoute from './routes/hardware.js';
import sessionRoute from './routes/session.js';
import userRoute from './routes/user.js';

// db
import { db } from './db.js';

const PORT = 4000;

const app = express();
const upload = multer();

app.set('trust proxy', 1) // trust first proxy

app.use(express.static(__dirname + '/../public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(session({
  secret: 'asdfkjl;jkiaosdfnkd;dj',
  cookie: { maxAge: 60 * 1000 },
  resave: true,
  saveUninitialized: true
}));

// 未登录用户只能访问 session 路由下的接口
app.use((req, res, next) => {
  let url = req.path;
  url = url.split('/')[2];
  if (!req.session.user && url !== 'session' && url !== 'hardware') {
    res.status(403).json('please signin!');
  } else {
    next();
  }
});

// 注册路由
app.use('/api/project', projectRoute);
app.use('/api/hardware', hardwareRoute);
app.use('/api/session', sessionRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log('server is listening @', PORT);
});
