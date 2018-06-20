const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('tools');
});

module.exports = router;
