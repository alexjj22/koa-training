const favicon = require('koa-favicon');

module.exports.init = app => app.use(favicon(__dirname + '../public/favicon.ico'));
