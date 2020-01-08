const path = require('path');

module.exports = {
  server: {
    host: 'http://localhost',
    port: 3000,
    testPort: 3002,
  },
  mongodb: {
    uri: 'mongodb://localhost/koa-test-app',
    debug: true,
  },
  templatesRoot: path.join(process.cwd() + '/templates/'),
  avatarRoot: path.join(process.cwd() + '/avatars/'),
  crypto: {
    hash: {
      length: 128,
      iterations: 10,
    }
  },
  mailer: {
    senders:  {
      default:  {
        email: 'koa.test.app@gmail.com',
        name:  'alexjj22',
      },
    }
  },
  providers: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/oauth/google',
    }
  }
}
