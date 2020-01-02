const assert = require('assert');
const rp = require('request-promise');
const config = require('config');
const app = require('../../app');
const mongoose = require('../../libs/mongoose');

const host = `http://localhost:${config.get('server.testPort')}`;
function getURL(path) {
  return `${host}${path}`;
};


describe('server', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(`${config.get('server.testPort')}`, done);
  });

  afterAll((done) => {
    mongoose.disconnect();
    server.close(done);
  });

  it('should return login page if user is not authorised', async () => {
    const res = await rp.get(getURL('/'));
    assert.ok(res.includes('<title>Login page</title>'));
  });
});
