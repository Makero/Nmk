const router = require('koa-router')();


router.get('/', async (ctx, next) => {
    await ctx.render('wechat/wxy', {
        title: '最美的你'
    })
});


module.exports = router;