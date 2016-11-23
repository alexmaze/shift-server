import { User } from '../models/user.js'

export function auth(req, res, next) {

  if (req.session.user) {
    console.log('登录的用户', req.session.user.name)
  }
  // if (req.method !== 'GET') {
  //   if (req.session.user === undefined || req.session.user.role !== 'admin') {
  //     res.status(403).end()
  //   }
  // }
  next()
}
