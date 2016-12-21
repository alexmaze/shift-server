import express from 'express'
import fs from 'fs-extra'
import crc32 from 'buffer-crc32'
import multer from 'multer'
import { upload } from '../utils/file-upload'

let router = express.Router()

// 保存硬件注册时间
let hdReport = {}
// 保存新固件信息
let hdImage = {}
// 保存硬件临时信息
let hdTempStore = {}
// 保存硬件从模块信息
let hdComponents = {}

/**
 * 硬件心跳接口，报告id给服务器，统计状态
 * @param  {[string]} '/report/:id' [硬件id]
 * @return {[integer]}               [0: 无新固件 | >0: 新固件大小(byte)]
 */
router.get('/report/:id', (req, res) => {
  let id = req.params.id

  // 注册最后汇报时间
  hdReport[id] = (new Date())

  // 检查是否有更新
  let ret = checkState(id)

  // 返回结果
  res.status(200).json(ret)
})

/**
 * 下载新固件
 * @param  {[type]} '/download/:id' [description]
 * @param  {[type]} (req,           res           [description]
 * @return {[type]}                 [description]
 */
router.get('/download/:id', (req, res) => {
  let id = req.params.id

  // 获取最新硬件地址

  let addr = getImagePath(id)
  if (addr === undefined) {
    res.status(404).end()
    return
  }
  const range = req.headers.range
  if (!range) {
    return res.download(addr)
  }
  const theRange = range.substr(6).split('-')
  const start = parseInt(theRange[0])
  const end = parseInt(theRange[1])
  const length = end - start + 1

  let data = Buffer.alloc(length)

  let download_tail = Buffer.alloc(4)
  download_tail[0] = 0xA5
  download_tail[1] = 0xA5
  download_tail[2] = 0xA5
  download_tail[3] = 0xA5
  fs.open(addr, 'r', (err, fd) => {
    if (err) {
      return res.status(500).json(err)
    }
    fs.read(fd, data, 0, length, start, (err, bytesRead, buffer) => {
      if (err) {
        return res.status(500).json(err)
      }
      res.removeHeader('date')
      const crcBuffer = crc32(buffer)
      // console.log(buffer)
      // console.log(crcBuffer)
      // console.log(Buffer.concat([buffer, crcBuffer]))
      return res.status(206).end(Buffer.concat([buffer, crcBuffer, download_tail]))
    })
  })

})

/**
 * 报告新固件下载完成
 * @param  {[type]} '/finish/:id' [description]
 * @param  {[type]} (req,         res           [description]
 * @return {[type]}               [description]
 */
router.get('/finish/:id', (req, res) => {
  let id = req.params.id
  hdImage[id] = undefined
  res.end()
})

router.post('/store/:id', (req, res) => {
  let id = req.params.id
  hdTempStore[id] = {
    updated: Date.now(),
    value: req.body
  }
  res.status(200).end()
})

router.get('/store/:id', (req, res) => {
  let id = req.params.id
  let data = hdTempStore[id]
  if (data && ((data.updated - Date.now()) < 120*1000) ) {
    res.json(data.value).end()
  } else {
    res.status(404).end()
  }
})

router.post('/components/:id', (req, res) => {
  let id = req.params.id
  hdComponents[id] = {
    updated: Date.now(),
    value: req.body
  }
  res.status(200).end()
})

//-----------------------------------------------

router.get('/status', (req, res) => {
  console.log(hdReport, hdImage)
  res.json({
    hdReport,
    hdImage,
    hdTempStore,
    hdComponents
  }).end()
})

router.post('/image', (req, res) => {
  console.log(req.body)
  hdImage[req.body.id] = req.body.image
  res.end()
})


router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    hdImage[req.body.node_id] = {
      size: req.file.size,
      path: 'public/upload/' + req.file.filename
    }
    return res.json(req.file)
  } else {
    return res.status(500).end()
  }
})

//===============================================
function checkState(id) {
  if (hdImage.hasOwnProperty(id)) {
    let image = hdImage[id]
    if (image === undefined) {
      return 0
    }
    return image.size
  } else {
    return 0
  }
}

function getImagePath(id) {
  if (hdImage[id] != undefined) {
    return hdImage[id].path
  } else {
    return undefined
  }
}

export default router
