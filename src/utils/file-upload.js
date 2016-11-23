const multer = require('multer')

let storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
  destination: process.cwd() + '/public/upload',
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
  filename: function (req, file, cb) {
    var fileFormat =(file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

//添加配置文件到muler对象。
export let upload = multer({
  storage: storage
})
