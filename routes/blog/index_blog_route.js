const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    let data = {model:2};
    data.theme = "主页";
    data.motto = "面对过去，不要迷离；面对未来，不必彷徨；活在今天，你只要把自己完全“展示”给别人看。";
    await ctx.render('blog/indexBlog',{data,artic:{},newart:{},sart:{}})
});

module.exports = router;