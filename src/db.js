import mongoose from 'mongoose'
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/smartnode')

export const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('数据库连接成功')
})
