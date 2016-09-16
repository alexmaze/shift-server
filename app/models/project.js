'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = exports.ProjectScheme = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProjectScheme = exports.ProjectScheme = new _mongoose2.default.Schema({
  name: String,
  author: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  created: Date
});

let Project = exports.Project = _mongoose2.default.model('Project', ProjectScheme);