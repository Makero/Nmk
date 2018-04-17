const router = require('koa-router')();
const api = require('../utils/wechat_api_util');
const wechatControl = require('../controllers/wechat_controller');


router.get('/', async (ctx, next) => {

    if(!ctx.query.echostr){
        ctx.body = "访问不正确！";
        return;
    }
    await wechatControl.validateToken({
        ctx,
        params:ctx.query
    });

    if(ctx.api.data.bool){
        ctx.body = ctx.query.echostr
    }else{
        ctx.body = {code:-1,msg:"fail"}
    }

});


router.post('/', async (ctx, next) => {
    const content = await api.getMessage(ctx);
    console.log(content);
    api.sendMessage(ctx,"ok啦！");
});

module.exports = router;