const session = require('koa-session')
const MongooseStore = require('koa-session-mongoose')
const mongoose = require('../libs/mongoose')

module.exports.init = app => app.use(session({
  signed: false,

  store: new MongooseStore({
    name: 'Sessoin',
    connection: mongoose
  })
}, app))
