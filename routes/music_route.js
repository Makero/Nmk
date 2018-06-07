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

router.get('/ajax/lrc', async(ctx, next) => {
    await songController.getSongLRC({
        ctx,
        params: ctx.query
    });
    console.log(ctx.api.data);
});
module.exports = router;