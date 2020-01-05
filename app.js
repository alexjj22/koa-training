const Koa = require('koa');
const router = require('./routes')

const app = new Koa();

require('./handlers/favicon').init(app);
require('./handlers/static').init(app);
require('./handlers/logger').init(app);
require('./handlers/templates').init(app);
require('./handlers/errors').init(app);
require('./handlers/session').init(app);
require('./handlers/bodyParser').init(app);
require('./handlers/passport').init(app);
require('./handlers/flash').init(app);

app.use(router.routes());

module.exports = app;
