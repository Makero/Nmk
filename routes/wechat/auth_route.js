const router = require('koa-router')();
const authController = require('../../controllers/auth_controller');

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/auth');
});

router.post('/ajax/key', async (ctx, next) => {
    console.log("=====");
    await authController.isAuth({
        ctx,
        params: ctx.request.body
    });
    console.log(ctx.api);
    ctx.body = ctx.api.data
});

module.exports = router;