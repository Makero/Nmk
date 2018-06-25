const router = require('koa-router')();
const wechatController = require('../../controllers/wechat_controller');

router.get('/', async (ctx, next) => {
    await ctx.render('wechat/talk', {
        title: '和晗晗对话',
        data: {talk:"你来啦，我等你好久了呢，咱们开始聊天吧"}
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
        ctx.body = '失败了';
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
