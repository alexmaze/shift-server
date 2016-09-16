'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

/**
 * 新建用户
 */
router.post('/', (req, res) => {
  console.log('create user', req.body);
  let newUser = new _user.User(req.body);
  newUser.created = new Date();
  newUser.save(err => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(newUser._id);
  });
});

/**
 * 更新用户
 * * 支持部分更新，_id 为必填
 */
router.patch('/', (req, res) => {
  console.log('update user', req.body);

  _user.User.findById(req.body._id, (err, user) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    Object.assign(user, req.body);
    user.save(err => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(user);
    });
  });
});

/**
 * 获取用户
 */
router.get('/:id', (req, res) => {
  console.log('find user', req.params.id);
  _user.User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.json(user);
  });
});

/**
 * 获取用户列表
 */
router.get('/', (req, res) => {
  console.log('find users');
  _user.User.find().exec((err, users) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(users);
  });
});

module.exports = router;