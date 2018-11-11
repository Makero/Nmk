const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');
const struggleController = require('../../controllers/zone/struggle_controller');


router.get('/w_mood', async (ctx, next) => {

    await ctx.render('zone/w_mood');
});

//发布心情
router.post('/mood_create', async (ctx, next) => {
    console.log(ctx.request.body);
    const data = {
        name:"Maker",
        address:"北京",
        img_url:"/null",
        content:ctx.request.body.content,
        keyword:"高兴",
        weather:"雨",
        power:ctx.request.body.power,
        user_id:2
    };
    await struggleController.postMood({
        ctx,
        token:ctx.session.token,
        params:data
    });
    console.error(ctx.api);
    ctx.body = 'ok';
});
module.exports = router;