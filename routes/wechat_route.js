const router = require('koa-router')();
const message = require('../utils/wechat_msg_util');
const wechatControl = require('../controllers/wechat_controller');


router.get('/', async (ctx) => {

    console.log(ctx.query);
    if(!ctx.query.echostr){
        ctx.body = "访问不正确！";
        return;
    }
    await wechatControl.validateToken({
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
    await wechatControl.msgHandle({
        ctx,
        params: msg
    });

    if(ctx.api.code === 200){
        message.send(ctx, ctx.api.data);
    }else{
        console.error(`状态码：${ctx.api.code}`);
        ctx.body = 'success';
    }
});

module.exports = router;