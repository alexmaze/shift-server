import mongoose from 'mongoose'
import async from 'async'

export function pageQuery(page, pageSize, Model, populate, queryParams, sortParams, callback) {
  let start = (page - 1) * pageSize
  let $page = {
    page,
    perpage: pageSize
  }

  async.parallel({
    count: function (done) { // 查询数量
      Model.count(queryParams).exec(function (err, count) {
        done(err, count)
      })
    },
    records: function (done) { // 查询一页的记录
      if (populate) {
        Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
          done(err, doc)
        })
      } else {
        Model.find(queryParams).skip(start).limit(pageSize).sort(sortParams).exec(function (err, doc) {
          done(err, doc)
        })
      }
    }
  }, function (err, results) {
    let count = results.count
    $page.total = count
    $page.items = results.records
    callback(err, $page)
  })
}
