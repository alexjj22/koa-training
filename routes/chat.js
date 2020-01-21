module.exports = {
  get (ctx) {
    ctx.body = ctx.render('chat.pug')
  }
}
