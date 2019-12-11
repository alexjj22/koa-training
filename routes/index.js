const Router = require('koa-router');
const frontpage = require('./frontpage');
const registration = require('./registration');
const confirmRegistration = require('./confirmRegistration');

const router = new Router();

router.get('/', frontpage.get);
router.get('/registration', registration.getRegistration);
router.post('/registration', registration.postRegistration);
router.get('/confirmRegistration/:verifyToken', confirmRegistration.get);
router.post('/confirmRegistration', confirmRegistration.post);

module.exports = router;
