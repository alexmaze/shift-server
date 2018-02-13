import { Project, IProject } from "../models/project.js"
import { newController } from "../utils/controller-factory"
import { getLogger } from "log4js"
import { shift } from "../lib/shift"

const logger = getLogger("[ProjectController]")

export const ProjectController = newController()

/**
 * 发布项目固件
 */
ProjectController.post("/deploy", (req, res) => {
  logger.debug("deploy:", JSON.stringify(req.body))
  res.json({})
})

/**
 * 新建项目
 */
ProjectController.post("/", (req, res) => {
  logger.debug("create  project", req.body)
  const newProj = new Project(req.body)
  newProj.set("created_at", new Date())
  newProj.set("author", req.session.user._id)
  newProj.save(err => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(newProj._id)
  })
})

/**
 * 更新项目
 * * 支持部分更新，_id 为必填
 */
ProjectController.patch("/", (req, res) => {
  logger.debug("update project", req.body)

  Project.findById(req.body._id, (err, proj) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    Object.assign(proj, req.body)
    proj.save(err1 => {
      if (err1) {
        res.status(500).json(err1)
        return
      }
      res.json(proj)
    })
  })
})

/**
 * 获取项目
 */
ProjectController.get("/:id", (req, res) => {
  logger.debug("find proj", req.params.id)
  Project.findById(req.params.id, (err, proj) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.json(proj)
  })
})

/**
 * 获取列表
 */
ProjectController.get("/", (req, res) => {
  logger.debug("find projs")
  Project.find().populate("author").exec((err, projs) => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(projs)
  })
})
