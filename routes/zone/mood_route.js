const router = require('koa-router')();
const isLogin = require('../../middleware/is_login');
const moodController = require('../../controllers/zone/mood_controller');

const data = {
    name:"Maker",
    title:"Makerの博客"
};
/* GET home page. */
router.get('/', async (ctx, next) => {
    data.theme = "碎言碎语";
    data.index = 0;
    let date = new Date();
    let dt     = date.getDay();
    let week = ['日','一','二','三','四','五','六'];
    await moodController.getMood({
        ctx,
        token:ctx.session.token,
        params:{page_size:10, page: 1}//, min_date: date.toLocaleDateString()
    });
    console.log(ctx.api);
    await ctx.render('zone/mood',{data:data,dat:ctx.api.results,date:date,week:week[dt],sear:0});
});

module.exports = router;