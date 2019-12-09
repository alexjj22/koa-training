const Router = require('koa-router');
const frontpage = require('./frontpage');
const registration = require('./registration');

const router = new Router();

router.get('/', frontpage.get);
router.get('/registration', registration.getRegistration);
router.post('/registration', registration.postRegistration);

module.exports = router;
