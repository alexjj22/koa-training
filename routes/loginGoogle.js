const passport = require('../libs/passport');

module.exports = {
  getGoogleLogin: passport.authenticate('google', { 
    scope: ['email', 'profile'],
  }),
  getGoogleLoginRedirect: passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: true,
  })
}
