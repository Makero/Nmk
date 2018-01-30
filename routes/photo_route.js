const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('photo')
});

module.exports = router;