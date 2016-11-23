import express from 'express'
import { User } from '../models/user.js'

import { pageQuery } from '../utils/db-utils'

let router = express.Router()

/**
 * 新建用户
 */
router.post('/', (req, res) => {
  console.log('create user', req.body)
  let newUser = new User(req.body)
  newUser.created = new Date()
  newUser.save(err => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(newUser._id)
  })
})

/**
 * 更新用户
 * * 支持部分更新，_id 为必填
 */
router.patch('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json(err)
      return
    }

    user.role = req.body.role
    user.name = req.body.name
    user.email = req.body.email
    user.save(err => {
      if (err) {
        res.status(500).json(err)
        return
      }
      user.password = undefined
      res.json(user)
    })
  })
})

/**
 * 获取用户
 */
router.get('/:id', (req, res) => {
  console.log('find user', req.params.id)
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    user.password = undefined
    res.json(user)
  })
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).end()
  })
})

/**
 * 获取用户列表
 */
router.get('/', (req, res) => {

  const page = req.query.page ? parseInt(req.query.page, 10) : 1
  const perpage = parseInt(req.query.perpage, 10)

  if (!perpage) {
    User.find().exec((err, list) => {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.json(list)
    })
  } else {
    pageQuery(page, perpage, User, undefined, {}, { created: 'desc' }, (err, $page) => {
      $page.items.forEach(user => {
        user.password = undefined
      })
      res.json($page)
    })
  }
})

export default router
