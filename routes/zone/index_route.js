const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');
const indexController = require('../../controllers/zone/index_controller');
router.get('/', async (ctx, next) => {
    let data = {model:1,title:'Makerの空间'};
    data.motto = "面对过去，不要迷离；面对未来，不必彷徨；活在今天，你只要把自己完全“展示”给别人看。";
    await indexController.getArticleList({
        ctx,
        token: ctx.session.token,
        params: {}
    });
    console.log(ctx.api);
    await ctx.render('zone/index',{data, userData: ctx.session, artic: ctx.api.results,newart:{},sart:{}})
});

module.exports = router;