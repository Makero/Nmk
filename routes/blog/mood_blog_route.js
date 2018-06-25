const router = require('koa-router')();
const data = {
    name:"Maker",
    title:"Makerの博客"
};
/* GET home page. */
router.get('/', async (ctx, next) => {
    data.theme = "碎言碎语";
    data.index = 0;
    let dat = [];
    let date = new Date();
    let dt     = date.getDay();
    let week = ['日','一','二','三','四','五','六'];
    await ctx.render('blog/moodBlog',{data:data,dat:dat,date:date,week:week[dt],sear:0});
});

module.exports = router;