'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

// 保存硬件注册时间
let hdReport = {};
// 保存新固件信息
let hdImage = {};

/**
 * 硬件心跳接口，报告id给服务器，统计状态
 * @param  {[string]} '/report/:id' [硬件id]
 * @return {[integer]}               [0: 无新固件 | >0: 新固件大小(byte)]
 */
router.get('/report/:id', (req, res) => {
    let id = req.params.id;

    // 注册最后汇报时间
    hdReport[id] = new Date();

    // 检查是否有更新
    let ret = checkState(id);

    // 返回结果
    res.status(200).json(ret);
});

/**
 * 下载新固件
 * @param  {[type]} '/download/:id' [description]
 * @param  {[type]} (req,           res           [description]
 * @return {[type]}                 [description]
 */
router.get('/download/:id', (req, res) => {
    let id = req.params.id;

    // 获取最新硬件地址
    let addr = getImagePath(id);
    if (addr === undefined) {
        res.status(404).end();
        return;
    }

    res.download(addr);
});

/**
 * 报告新固件下载完成
 * @param  {[type]} '/finish/:id' [description]
 * @param  {[type]} (req,         res           [description]
 * @return {[type]}               [description]
 */
router.get('/finish/:id', (req, res) => {
    let id = req.params.id;
    hdImage[id] = undefined;
    res.end();
});

//-----------------------------------------------

router.get('/status', (req, res) => {
    console.log(hdReport, hdImage);
    res.json({ hdReport: hdReport, hdImage: hdImage }).end();
});

router.post('/image', (req, res) => {
    hdImage[req.body.id] = req.body.image;
    res.end();
});

//===============================================
function checkState(id) {
    if (hdImage.hasOwnProperty(id)) {
        let image = hdImage[id];
        if (image === undefined) {
            return 0;
        }
        return image.size;
    } else {
        return 0;
    }
}
function getImagePath(id) {
    if (hdImage.hasOwnProperty(id)) {
        return hdImage[id].path;
    } else {
        return undefined;
    }
}

module.exports = router;