module.exports = {
  get(ctx, next) {
    ctx.body = ctx.render('login.pug');
  }
}