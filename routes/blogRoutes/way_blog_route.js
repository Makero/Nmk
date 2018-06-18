const router = require('koa-router')();
const data = {
    name:"Maker",
    title:"Makerの博客"
};

router.get('/', async (ctx, next) => {
    data.theme  = "长路漫漫";
    data.talk   = "我以为只要有光，我就可以虚张声势，就可以很坚强。";
    data.stitle = "";
    data.index  = 3;
    await ctx.render('blogViews/wayBlog',{data:data,artic:[],artictype:[],newart:[],photos:[],len:0})
});

module.exports = router;