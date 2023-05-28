const Router = require('@koa/router');
const router = new Router({ prefix: '/api/v1' });
const user = require('../controller/user');
const home = require('../controller/home');
const article = require('../controller/article');
const goods = require('../controller/goods');
const messages = require('../controller/messages');

const {
  registerValidate,
  loginValidate,
} = require('../middleware/userValidate');

router.post('/user/register', registerValidate, user.register);
router.post('/user/login', loginValidate, user.login);

router.post('/home/list', home.getHomeList);

router.get(`/article/detail`, article.getArticleDetail);

router.get(`/goods/list`, goods.getGoodsList);
router.get(`/goods/top10`, goods.getTop10Category);

router.get(`/messages/list`, messages.getMessageList);
router.get(`/messages/unRead`, messages.getUnRead);

module.exports = router;
