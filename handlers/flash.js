module.exports.init = app => app.use(async (ctx, next) => {
  // keep previous flash
  const messages = ctx.session.messages || {}

  // clear all flash
  delete ctx.session.messages

  ctx.getFlashMessages = function () {
    return messages
  }

  ctx.flash = function (type, info) {
    if (!ctx.session.messages) {
      ctx.session.messages = {}
    }

    if (!ctx.session.messages[type]) {
      ctx.session.messages[type] = []
    }

    ctx.session.messages[type].push(info)
  }

  await next()

  if (ctx.status === 302 && !ctx.session.messages) {
    ctx.session.messages = messages
  }
})
