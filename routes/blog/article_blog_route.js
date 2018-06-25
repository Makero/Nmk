const router = require('koa-router')();

router.get('/', async (ctx, next) => {

    await ctx.render('blog/articleBlog',{data:[]})
});

module.exports = router;