const Koa = require('koa');
const Router = require('koa-router');
const frontpage = require('./routes/frontpage');

const app = new Koa();
const router = new Router();

require('./handlers/01-favicon').init(app);
require('./handlers/02-bodyParser').init(app);
require('./handlers/03-templates').init(app);

router.get('/', frontpage.get);

app.use(router.routes());

module.exports = app;
