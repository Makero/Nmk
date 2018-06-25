const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/photo')
});

module.exports = router;