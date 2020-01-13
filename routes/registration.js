const config = require('config');
const { uuid } = require('uuidv4');
const RegistrationRecord = require('../models/RegistrationRecord');
const User = require('../models/User');
const sendEmail = require('../libs/sendEmail')

module.exports = {
  getRegistration(ctx) {
    ctx.body = ctx.render('registration.pug');
  },
  async postRegistration(ctx) {
    const redirectUrl = '/registration';

    ctx.errorRedirectUrl = redirectUrl;

    const { email } = ctx.request.body;

    const user = await User.findOne({ email });

    if (user) {
      ctx.flash('error', 'email: Such e-mail is already registered');

      return ctx.redirect(redirectUrl);
    }

    const verifyToken = uuid();

    const record = new RegistrationRecord({
      email,
      verifyToken,
    });

    await record.save();

    await sendEmail({
      to: email,
      template: 'registration',
      subject: 'Email confirmation',
      locals: {
        link: `${config.get('server.host')}:${config.get('server.port')}/confirmRegistration/${verifyToken}`
      },
    });

    ctx.flash('success', 'Thanks! We have sent further instructions for reginstration to your e-mail.');
    return ctx.redirect(redirectUrl);
  }
}
