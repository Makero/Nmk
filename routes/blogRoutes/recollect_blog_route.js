const router = require('koa-router')();
const data = {
    name:"Maker",
    title:"Makerの博客"
};

router.get('/', async (ctx, next) => {
    data.theme = "记·忆";
    data.index = 1;
    data.talk  = "初遇时，她的微笑，她往日的深情、承诺和傻劲，两个人共度的美丽时刻，一一印在回忆里，今天的感情已经比不上从前，但是我爱着恋着往日的她，舍不得离开。";
    await ctx.render('blogViews/recollectBlog',{data})
});

module.exports = router;