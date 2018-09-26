const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');


/** 商城 **/
router.get('/', async (ctx) => {
    await ctx.render('zone/mall');
});


module.exports = router;