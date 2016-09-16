import express from 'express';
import { User } from '../models/user.js';

let router = express.Router();

/**
 * 登录
 */
router.put('/signin', (req, res) => {
  console.log('signin', req.body);
  User.find({
    email: req.body.email,
    password: req.body.password
  }).exec((err, users) => {
    console.log(users);
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (users.length < 1) {
      res.status(404).json('no user or password wrong!');
      return;
    }
    req.session.user = users[0];
    res.json(users[0]);
  })
});

/**
 * 登出
 */
router.put('/signout', (req, res) => {
  console.log('signout', req.body);
  req.session.destroy();
  res.json('ok');
});

module.exports = router;
