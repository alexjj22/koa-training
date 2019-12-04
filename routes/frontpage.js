const path = require('path');
const pug = require('pug');

module.exports = {
  get(ctx, next) {
    ctx.body = pug.renderFile(path.join(process.cwd() + '/templates/login.pug'));
  }
}