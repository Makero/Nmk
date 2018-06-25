const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/tools');
});

module.exports = router;
