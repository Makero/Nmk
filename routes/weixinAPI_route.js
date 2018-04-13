const router = require('koa-router')();
const api = require('../utils/weixinAPI_util');
const wechatControl = require('../controllers/wechat_controller');


router.get('/', async (ctx, next) => {

    await wechatControl.getBaiDuCont({
        params:{},
        callback: (result) => {
            console.log(result);
            ctx.body = "ok";
            console.log(ctx);
            next();
        }
    });

    /*let echostr = {code:-1,msg:"fail"};
    if(api.checkSignature(ctx.query)){
        echostr = ctx.query.echostr;
    }
    ctx.body = echostr;*/
});

router.post('/', async (ctx, next) => {
    const content = await api.getMessage(ctx);
    console.log(content);
    api.sendMessage(ctx,"ok啦！");
});

module.exports = router;