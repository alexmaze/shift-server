import { Project, IProject } from "../models/project.js"
import { newController } from "../utils/controller-factory"

export const ProjectController = newController()

/**
 * 发布项目固件
 */
ProjectController.post("/deploy", (req, res) => {
  console.log("deploy:", JSON.stringify(req.body))
  res.json(req.body)
})

/**
 * 新建项目
 */
ProjectController.post("/", (req, res) => {
  console.log("create  project", req.body)
  const newProj = new Project(req.body)
  newProj.set("created_at", new Date())
  newProj.set("author", req.session.user._id)
  newProj.save((err) => {
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
  console.log("update project", req.body)

  Project.findById(req.body._id, (err, proj) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    Object.assign(proj, req.body)
    proj.save((err1) => {
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
  console.log("find proj", req.params.id)
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
  console.log("find projs")
  Project.find().populate("author").exec((err, projs) => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.json(projs)
  })
})
