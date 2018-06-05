const router = require('koa-router')();
const songController = require('../controllers/music_controller');

router.get('/', async (ctx, next) => {

    await songController.getSong({
        ctx,
        params: ctx.query
    });

    await ctx.render('music', {
        title: '音乐',
        data: ctx.api.data
    })
});

module.exports = router;