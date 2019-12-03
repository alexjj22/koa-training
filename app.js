const Koa = require('koa');
const app = new Koa();

require('./handlers/01-favicon').init(app);

app.use(async ctx => {
  ctx.body = 'Hello, World!';
});

module.exports = app;
