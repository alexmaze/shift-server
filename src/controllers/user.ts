import { User, IUser } from "../models"
import { newController } from "../utils/controller-factory"
import { pageQuery } from "../utils/page-query"
import { Logger } from "../utils/logger"

const logger = Logger("UserController")

export const UserController = newController()

/**
 * 新建用户
 */
UserController.post("/", (req, res) => {
  logger.debug("create user", req.body)
  const newUser = new User(req.body)
  newUser.set("created_at", new Date())
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
UserController.patch("/:id", (req, res) => {
  User.findById(req.params.id, (err, userModel) => {
    if (err) {
      res.status(404).json(err)
      return
    }

    userModel.set("name", req.body.name)
    userModel.set("email", req.body.email)

    userModel.save(err1 => {
      if (err1) {
        res.status(500).json(err1)
        return
      }
      const user = userModel.toObject() as IUser
      user.password = undefined
      res.json(user)
    })
  })
})

/**
 * 获取用户
 */
UserController.get("/:id", (req, res) => {
  logger.debug("find user", req.params.id)
  User.findById(req.params.id, (err, ret) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    const user = ret.toObject() as IUser
    user.password = undefined
    res.json(user)
  })
})

UserController.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
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
UserController.get("/", (req, res) => {
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
    pageQuery(
      page,
      perpage,
      User,
      undefined,
      {},
      { created: "desc" },
      (err, $page) => {
        $page.items.forEach(user => {
          user.password = undefined
        })
        res.json($page)
      }
    )
  }
})
