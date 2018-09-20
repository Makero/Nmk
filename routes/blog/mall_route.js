const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');


/** 商城 **/
router.get('/', async (ctx) => {
    await ctx.render('blog/mall');
});


module.exports = router;