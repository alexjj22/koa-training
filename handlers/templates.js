const path = require('path');
const pug = require('pug');
const config = require('config');

module.exports.init = app => app.use(async (ctx, next) => {
  ctx.locals = {
    // at the time of ctx middleware, user is unknown, so we make it a getter
    get user() {
      return ctx.state.user; // passport sets ctx
    },

    get flash() {
      return ctx.getFlashMessages();
    }
  };

  ctx.render = function(template, locals) {
    return pug.renderFile(
      path.join(config.get('templatesRoot') + template),
      Object.assign({}, ctx.locals, locals)
    );
  }

  await next();
});
