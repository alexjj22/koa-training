const assert = require('assert');
const rp = require('request-promise');
const config = require('config');
const app = require('../../app');
const mongoose = require('../../libs/mongoose');
const User = require('../../models/User');

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

  it('should render warning message when user fills in wrong data to login', async () => {
    try {
      await rp.post(getURL('/login'), {
        // resolveWithFullResponse: true,
        simple: false,
        form: {
          email: 'test@test.com',
          password: 'test'
        },
        jar: true,
      });

      const res = await rp.get(getURL('/'), { jar: true });

      assert.ok(res.includes('<title>Login page</title>'));
      assert.ok(res.includes('User with such email is not registered'));
    } catch (e) {
      console.log(e);
    }
  });

  it('should render home page and success message if user fills in correct data to login', async () => {
    try {
      const user = new User({
        email: 'test@test.com',
        username: 'test',
      });
      await user.setPassword('test');
      await user.save();

      await rp.post(getURL('/login'), {
        // resolveWithFullResponse: true,
        simple: false,
        form: {
          email: 'test@test.com',
          password: 'test'
        },
        jar: true,
      });

      const res = await rp.get(getURL('/'), { jar: true });

      assert.ok(res.includes('<title>Home page</title>'));
      assert.ok(res.includes('You are welcome'));

      await user.deleteOne({ email: 'test@test.com' });
    } catch (e) {
      console.log(e);
    }
  })
});
