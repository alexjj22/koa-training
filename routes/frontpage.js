const path = require('path');
const pug = require('pug');

module.exports = {
  get(ctx, next) {
    ctx.body = ctx.render('login.pug');
  }
}