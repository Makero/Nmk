const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');
const indexController = require('../../controllers/blog/index_controller');
router.get('/', isLogin, async (ctx, next) => {
    let data = {model:2,title:'Maker空间'};
    data.motto = "面对过去，不要迷离；面对未来，不必彷徨；活在今天，你只要把自己完全“展示”给别人看。";
    await indexController.getArticleList({
        ctx,
        token: ctx.session.token,
        params: {}
    });
    console.log(ctx.api);
    await ctx.render('blog/indexBlog',{data, userData: ctx.session, artic: ctx.api.results,newart:{},sart:{}})
});

module.exports = router;