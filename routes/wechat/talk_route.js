const router = require('koa-router')();
const talkConfig = require('../../config/talk_config');
const wechatController = require('../../controllers/wechat_controller');

getRandomNum = (max, min) => {
    return Math.round(Math.random()*(max - min));
};
const n = talkConfig.length;
router.get('/', async (ctx, next) => {
    await ctx.render('wechat/talk', {
        data: {talk:talkConfig[getRandomNum(n, 0)]}
    })
});

router.post('/ajax/wxConfig', async (ctx, next) => {
    await wechatController.wxConfig({
        ctx,
        params: ctx.request.body
    });
    if(ctx.api.code === 200){
        ctx.body = ctx.api.data;
    }else{
        console.error(ctx.api);
        ctx.body = 'error';
    }
});

router.post('/ajax/msg', async (ctx, next) => {
    await wechatController.msgTalk({
        ctx,
        params: ctx.request.body
    });
    console.log(ctx.api.data.text);
    ctx.body = ctx.api.data.text;
});

router.post('/ajax/qyk', async (ctx, next) => {
    await wechatController.qykTalk({
        ctx,
        params: ctx.request.body
    });
    ctx.body = ctx.api.content;
});

module.exports = router;
