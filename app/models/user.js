'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.UserScheme = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UserScheme = exports.UserScheme = new _mongoose2.default.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    unique: true,
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatarUrl: String,
  gender: Boolean,
  created: Date
});

let User = exports.User = _mongoose2.default.model('User', UserScheme);