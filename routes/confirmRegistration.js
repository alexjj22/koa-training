const { split, last } = require('lodash');
const RegistrationRecord = require('../models/RegistrationRecord');
const User = require('../models/User');

module.exports = {
  async get(ctx) {
    const registrationRecord = await RegistrationRecord.findOne({
      verifyToken: ctx.params.verifyToken
    });

    ctx.body = ctx.render('confirmRegistration.pug', {
      registrationRecord,
    });
  },
  async post(ctx) {
    const verifyToken = last(split(ctx.request.header.referer, '/'));

    const { username, password } = ctx.request.body;

    try {
      const record = await RegistrationRecord.findOne({
        verifyToken
      });

      const user = new User({
        username,
        email: record.email,
      });

      await user.setPassword(password);
      await user.save();
      await record.remove();

      ctx.body = ctx.render('registered.pug');
    } catch (e) {
      if (e.name === 'ValidationError') {
        let errorMessages = '';
        for(let key in e.errors) {
          errorMessages += `${key}: ${e.errors[key].message}<br>`;
        }
        ctx.flash('error', errorMessages);
        return ctx.redirect(`/confirmRegistration/${verifyToken}`);
      } else {
        throw e;
      }
    }


  }
}