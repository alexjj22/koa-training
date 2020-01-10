const config = require('config');
const assert = require('assert');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const app = require('../../app');
const mongoose = require('../../libs/mongoose');

const port = 3000;
const timeout = 60000;

const opts = {
  headless: true,
  // slowMo: 50,
  ignoreHTTPSErrors: true,
  timeout,
  args: [
    '--disable-notifications',
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
};

puppeteer.use(StealthPlugin())

describe('login via passport strategy', () => {
  let server;
  let browser;
  let page;

  beforeAll(done => {
    server = app.listen(port, async () => {
      browser = await puppeteer.launch(opts);
      done();
    });
  });

  afterAll(done => {
    browser.close();
    mongoose.disconnect();
    server.close(done);
  });

  it('should login login user using google', async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${port}`, {waitUntil: 'networkidle0'});

    const titleLogin = await page.evaluate(() => document.getElementsByTagName('title')[0].text);
    assert.strictEqual(titleLogin, 'Login page');

    await page.click('#google-login');

    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.waitForSelector('#identifierId');
    await page.type('#identifierId', config.get('testAccaunt.google.email'), { delay: 5 } );
    await page.waitForSelector('#identifierNext');
    await page.click('#identifierNext');  
    
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.waitForSelector('#password input[type=password]', { visible: true });
    await page.type('#password input[type=password]', config.get('testAccaunt.google.password'), { delay: 5 });
    await page.waitFor(1000);
    await page.waitForSelector('#passwordNext', { visible: true });
    await page.click('#passwordNext');

    await page.waitForNavigation({waitUntil: 'networkidle2'});

    assert.strictEqual(page.url(), 'http://localhost:3000/');

    const titleHome = await page.evaluate(() => document.getElementsByTagName('title')[0].text);
    assert.strictEqual(titleHome, 'Home page');
  }, timeout);
});
