async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    const errorRedirectUrl = ctx.errorRedirectUrl;
    if (!errorRedirectUrl) throw e;

    if (e.name === 'ValidationError') {
      let errorMessages = '';
      for(let key in e.errors) {
        errorMessages += `${key}: ${e.errors[key].message}<br>`;
      }
      ctx.flash('error', errorMessages);
      return ctx.redirect(errorRedirectUrl);
    } else {
      throw e;
    }
  }
}

module.exports = errorHandler;
