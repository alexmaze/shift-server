import * as mongoose from "mongoose"
import * as async from "async"

export function pageQuery<T>(
  page: number,
  pageSize: number,
  Model: mongoose.Model<T>,
  populate,
  queryParams,
  sortParams,
  callback) {

  const start = (page - 1) * pageSize
  const $page = {
    page,
    perpage: pageSize,
    total: null,
    items: null
  }

  async.parallel({
    // 查询数量
    count(done) {
      Model.count(queryParams).exec((err, count) => {
        done(err, count)
      })
    },
    // 查询一页的记录
    records(done) {
      if (populate) {
        Model.find(queryParams)
        .skip(start)
        .limit(pageSize)
        .populate(populate)
        .sort(sortParams)
        .exec((err, doc) => {
          done(err, doc)
        })
      } else {
        Model.find(queryParams)
        .skip(start)
        .limit(pageSize)
        .sort(sortParams)
        .exec((err, doc) => {
          done(err, doc)
        })
      }
    }
  }, (err, results) => {
    const count = results.count
    $page.total = count
    $page.items = results.records
    callback(err, $page)
  })
}
