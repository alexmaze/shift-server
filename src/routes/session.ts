import * as express from "express"
import { User, IUser } from "../models"

let router = express.Router()

/**
 * 登录
 */
router.put("/", (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(403).end()
  }
  User.findOne({ name: req.body.name, password: req.body.password }).exec().then((ret) => {
    if (ret) {
      const user = ret.toObject() as IUser
      user.password = undefined
      req.session.user = user
      res.json(user)
    } else {
      res.status(403).end()
    }
  }, (err) => {
    res.status(500).json(err)
  })
})

/**
 * 注销登录
 */
router.delete("/", (req, res) => {
  req.session.user = undefined
  res.status(200).end()
})

/**
 * 获取当前session信息
 */
router.get("/", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).end()
  }
})

export default router
