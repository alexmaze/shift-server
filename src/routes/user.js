import express from 'express';
import { User } from '../models/user.js';

let router = express.Router();

/**
 * 新建用户
 */
router.post('/', (req, res) => {
  console.log('create user', req.body);
  let newUser = new User(req.body);
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

  User.findById(req.body._id, (err, user) => {
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
    })
  });
});

/**
 * 获取用户
 */
router.get('/:id', (req, res) => {
  console.log('find user', req.params.id);
  User.findById(req.params.id, (err, user) => {
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
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(users);
  });
});

module.exports = router;
