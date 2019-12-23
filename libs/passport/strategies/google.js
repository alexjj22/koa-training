const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config');
const User = require('../../../models/User')

module.exports = new GoogleStrategy(
  {...config.get('providers.google')},
  async (accessToken, refreshToken, profile, done) => {
    if (!profile.emails || !profile.emails.length) {
      return done(null, false, {message: 'No email!'});
    }
    const email = profile.emails[0].value;

    try {
      let user = await User.findOne({email});

      if (user) {
        return done(null, user, { message: 'You are welcome' });
      }

      user = await User.create({
        email,
        username: profile.displayName,
      });
      done(null, user, { message: 'You are welcome' });
    } catch (err) {
      console.error(err);
      done(err);
    }
});
