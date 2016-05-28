/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import logger from 'morgan';

import projectRoute from './routes/project';
import hardwareRoute from './routes/hardware.js';

const PORT = 4000;

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());

// 注册路由
app.use('/api/project', projectRoute);
app.use('/api/hardware', hardwareRoute);

app.listen(PORT, () => {
  console.log('server is listening @', PORT);
});
