const path = require('path');

module.exports = {
  server: {
    host: 'http://localhost',
    port: 3000,
  },
  mongodb: {
    uri: 'mongodb://localhost/koa-test-app',
    debug: true,
  },
  templatesRoot: path.join(process.cwd() + '/templates/'),
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
}
