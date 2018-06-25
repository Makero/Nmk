const router = require('koa-router')();
const data = {
    name:"Maker",
    title:"Makerの博客"
};

router.get('/', async (ctx, next) => {

    data.theme  = "关于我";
    data.talk   = "n像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。";
    data.index  = 4;
    data.stitle = "";
    let adata   = [];

    await ctx.render('blog/aboutBlog',{data,mess:adata})
});

module.exports = router;