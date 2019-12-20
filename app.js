const Koa = require('koa');
const router = require('./routes')

const app = new Koa();

require('./handlers/01-favicon').init(app);
require('./handlers/02-bodyParser').init(app);
require('./handlers/03-templates').init(app);
require('./handlers/04-session').init(app);
require('./handlers/06-passport').init(app);
require('./handlers/05-flash').init(app);

app.use(router.routes());

module.exports = app;
