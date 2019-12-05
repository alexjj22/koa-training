module.exports = {
  getRegistration(ctx, next) {
    ctx.body = ctx.render('registration.pug');
  }
}