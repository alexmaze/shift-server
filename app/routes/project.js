'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _project = require('../models/project.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

/**
 * 发布项目固件
 */
router.post('/deploy', (req, res) => {
  console.log('deploy:', JSON.stringify(req.body));
  res.json(req.body);
});

/**
 * 新建项目
 */
router.post('/', (req, res) => {
  console.log('create  project', req.body);
  let newProj = new _project.Project(req.body);
  newProj.created = new Date();
  newProj.author = req.session.user._id;
  newProj.save(err => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(newProj._id);
  });
});

/**
 * 更新项目
 * * 支持部分更新，_id 为必填
 */
router.patch('/', (req, res) => {
  console.log('update project', req.body);

  _project.Project.findById(req.body._id, (err, proj) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    Object.assign(proj, req.body);
    proj.save(err => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(proj);
    });
  });
});

/**
 * 获取项目
 */
router.get('/:id', (req, res) => {
  console.log('find proj', req.params.id);
  _project.Project.findById(req.params.id, (err, proj) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.json(proj);
  });
});

/**
 * 获取列表
 */
router.get('/', (req, res) => {
  console.log('find projs');
  _project.Project.find().populate('author').exec((err, projs) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(projs);
  });
});

module.exports = router;