'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _project = require('./routes/project');

var _project2 = _interopRequireDefault(_project);

var _hardware = require('./routes/hardware.js');

var _hardware2 = _interopRequireDefault(_hardware);

var _session = require('./routes/session.js');

var _session2 = _interopRequireDefault(_session);

var _user = require('./routes/user.js');

var _user2 = _interopRequireDefault(_user);

var _db = require('./db.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = 4000;

// db
/* @flow */

const app = (0, _express2.default)();
const upload = (0, _multer2.default)();

app.set('trust proxy', 1); // trust first proxy

app.use(_express2.default.static(__dirname + '/../public'));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
  secret: 'asdfkjl;jkiaosdfnkd;dj',
  cookie: { maxAge: 60 * 1000 },
  resave: true,
  saveUninitialized: true
}));

// 未登录用户只能访问 session 路由下的接口
app.use((req, res, next) => {
  let url = req.path;
  url = url.split('/')[2];
  if (!req.session.user && url !== 'session') {
    res.status(403).json('please signin!');
  } else {
    next();
  }
});

// 注册路由
app.use('/api/project', _project2.default);
app.use('/api/hardware', _hardware2.default);
app.use('/api/session', _session2.default);
app.use('/api/user', _user2.default);

app.listen(PORT, () => {
  console.log('server is listening @', PORT);
});