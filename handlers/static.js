const koaStatic = require('koa-static');

module.exports.init = app => app.use(koaStatic('public'));
