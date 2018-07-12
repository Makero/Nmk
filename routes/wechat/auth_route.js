const router = require('koa-router')();
const authController = require('../../controllers/auth_controller');

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/auth');
});

router.post('/ajax/register', async (ctx, next) => {

    await authController.isAuth({
        ctx,
        params: ctx.request.body
    });
    console.log(ctx.api);
    ctx.body = ctx.api;
});

module.exports = router;