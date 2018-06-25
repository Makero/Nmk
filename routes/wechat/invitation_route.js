const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/invitation', {
        title: '邀请函'
    })
});

router.get('/smart', async (ctx, next) => {
    await ctx.render('wechat/smartHome', {
        title: '智能家居介绍'
    })
});

module.exports = router;
