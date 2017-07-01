import * as express from "express"
import { User } from "../db/models"

const router = express.Router()

/**
 * 登录
 */
router.put("/", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    res.status(403).end()
  }
  const datas = await User.find({ name: req.body.name, password: req.body.password }).exec()

  if (!datas || datas.length < 0) {
    res.status(403).end()
  }

  const user = { ...datas[0].toObject(), password: undefined }
  req.session.user = user
  res.json(user)
})

/**
 * 注销
 */
router.delete("/", (req, res) => {
  req.session.user = undefined
  res.status(200).end()
})

/**
 * 检查 session
 */
router.get("/", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).end()
  }
})

export default router
