const router = require('koa-router')();
const message = require('../../utils/wechat_msg');
const wechatController = require('../../controllers/wechat_controller');


router.get('/', async (ctx) => {

    if(!ctx.query.echostr){
        ctx.body = "访问不正确！";
        return;
    }
    await wechatController.validateToken({
        ctx,
        params: ctx.query
    });
    if(ctx.api.data.bool){
        ctx.body = ctx.query.echostr
    }else{
        ctx.body = {code:-1,msg:"fail"}
    }

});


router.post('/', async (ctx) => {

    const msg = await message.get(ctx);
    await wechatController.msgHandle({
        ctx,
        params: msg
    });

    if(ctx.api.code === '20001'){
        message.send(ctx, ctx.api.data);
    }else{
        console.error(`状态码：${ctx.api.code}`);
        ctx.body = 'success';
    }
});


router.get('/saveImg', async (ctx) => {
    console.log(ctx.query);
    await wechatController.saveImage({
        ctx,
        params: ctx.query
    });
    ctx.body = ctx.api.data.url;
});


router.get('/test', async (ctx, next) => {
    await ctx.render('test');
});


module.exports = router;