const Router = require('koa-router');
const koaBody = require('koa-body');
const frontpage = require('./frontpage');
const avatar = require('./avatar');
const registration = require('./registration');
const confirmRegistration = require('./confirmRegistration');
const login = require('./login');
const logout = require('./logout');
const loginGoogle = require('./loginGoogle');
const errorHandler= require('../secondaryMiddlewares/error');

const router = new Router();

router.get('/', frontpage.get);
router.post('/avatar', koaBody({ multipart: true }), avatar.post);
router.post('/login', login.post);
router.get('/login/google',loginGoogle.getGoogleLogin);
router.get('/oauth/google', loginGoogle.getGoogleLoginRedirect);
router.post('/logout', logout.post);
router.get('/registration', registration.getRegistration);
router.post('/registration', errorHandler, registration.postRegistration);
router.get('/confirmRegistration/:verifyToken', confirmRegistration.get);
router.post('/confirmRegistration', errorHandler, confirmRegistration.post);

module.exports = router;
