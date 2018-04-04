const router = require('koa-router')();
const api = require('../utils/weixinAPI_util');

router.get('/', async (ctx, next) => {
    let echostr = {code:-1,msg:"fail"};
    if(api.checkSignature(ctx.query)){
        echostr = ctx.query.echostr;
    }
    ctx.body = echostr;
});

router.post('/', async (ctx, next) => {
    const content = await api.getMessage(ctx);
    console.log(content);
    api.sendMessage(ctx,"ok啦！");
});

module.exports = router;