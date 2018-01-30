const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('invitation', {
        title: '邀请函'
    })
});

module.exports = router;
