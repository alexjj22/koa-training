const LocalStrategy = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async function(email, password, done) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User with such email is not registered' });
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      return done(null, false, { message: 'Wrong password' });
    }

    return done(null, user, { message: 'You are welcome' });
  } catch (e) {
    console.log(e);
    done(e);
  }
});
