const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');
const articleController = require('../../controllers/zone/article_controller');

const data = {
    name:"Maker",
    title:"Makerの博客"
};

router.get('/', async (ctx, next) => {

    await ctx.render('zone/article',{data:[]})
});


router.get('/:id/detail', async (ctx, next) => {
    data.theme  = "长路漫漫";
    data.stitle = "";
    data.index  = 3;
    await articleController.getArticleDetail({
        ctx,
        token: ctx.session.token,
        params: {id:ctx.params.id}
    });
    console.log(ctx.api);
    await ctx.render('zone/article',{data:data, article:ctx.api})
});

module.exports = router;