import { User, IUser } from "../models"
import { newController } from "../utils/controller-factory"
import { getLogger } from "log4js"

const logger = getLogger("[SessionController]")

export const SessionController = newController()

/**
 * 登录
 */
SessionController.put("/", (req, res) => {
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
SessionController.delete("/", (req, res) => {
  req.session.user = undefined
  res.status(200).end()
})

/**
 * 获取当前session信息
 */
SessionController.get("/", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).end()
  }
})
