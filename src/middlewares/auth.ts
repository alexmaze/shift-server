export function AuthMiddleware(req, res, next) {

  if (req.session && req.session.user) {
    console.log("登录的用户", req.session.user.name)
  }
  next()
}
