const path = require('path');

module.exports = {
  server: {
    host: 'http://localhost',
    port: 3000,
  },
  mongo: {
    uri: 'mongodb://localhost/koa-test-app',
    debug: true,
  },
}
