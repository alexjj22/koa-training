const favicon = require('koa-favicon')

module.exports.init = app => app.use(favicon(process.cwd() + '/public/favicon.ico'))
