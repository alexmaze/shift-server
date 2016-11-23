import express from 'express'
import { User } from '../models/user.js'

let router = express.Router()

// 登录
router.put('/', (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(403).end()
  }
  User.find({ name: req.body.name, password: req.body.password }).exec().then(users => {
    if (users && users[0]) {
      req.session.user = users[0]
      users[0].password = undefined
      res.json(users[0])
    } else {
      res.status(403).end()
    }
  }, err => {
    res.json(err)
  })
})

router.delete('/', (req, res) => {
  req.session.user = undefined
  res.status(200).end()
})

router.patch('/', (req, res) => {
  let opUser = req.session.user
  if (req.query.password) {
    // 修改密码
    User.findById(opUser._id, (err, user) => {
      if (err) {
        res.status(404).json(err)
        return
      }

      user._id = opUser._id
      if (user.password === req.body.old) {
        user.password = req.body.new
        User.update(user, (err) => {
          if (err) {
            res.status(500).json(err)
          }
          res.status(200).end()
          return
        })
      }
    })
  }
})

router.get('/', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).end()
  }
})

export default router
