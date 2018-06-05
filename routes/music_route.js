const router = require('koa-router')();
const songController = require('../controllers/music_controller');

router.get('/', async (ctx, next) => {

    await songController.getSong({
        ctx,
        params: ctx.query
    });
    console.log(ctx.api);
    await ctx.render('music', {
        title: '音乐',
        data: ctx.api.data
    })
});

module.exports = router;