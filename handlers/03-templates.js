const path = require('path');
const pug = require('pug');
const config = require('config');

module.exports.init = app => app.use(async (ctx, next) => {

  ctx.render = function(template, locals) {
    return pug.renderFile(
      path.join(config.get('templatesRoot') + template),
      Object.assign({}, ctx.locals, locals)
    )
  }

  await next();
});
