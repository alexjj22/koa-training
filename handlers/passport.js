const passport = require('koa-passport')

module.exports.init = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}
