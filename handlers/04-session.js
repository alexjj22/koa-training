const session = require('koa-session');

module.exports.init = app => app.use(session({
  signed: false,
}, app));
