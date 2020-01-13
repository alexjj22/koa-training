
module.exports.post = function (ctx, next) {
  ctx.logout()

  ctx.redirect('/')
}
