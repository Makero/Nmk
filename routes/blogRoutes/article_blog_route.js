const router = require('koa-router')();

router.get('/', async (ctx, next) => {

    await ctx.render('blogViews/articleBlog',{data:[]})
});

module.exports = router;