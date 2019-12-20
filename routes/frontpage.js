module.exports = {
  get(ctx, next) {
    ctx.body = ctx.render(ctx.isAuthenticated() ? 'home.pug' : 'login.pug');
  }
}