const router = require('koa-router')();
const fs = require('fs');
const request = require('request');
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

router.get('/play/:id', async (ctx, netx) => {

    wstream  = fs.createWriteStream(process.cwd()+"/temp/"+ ctx.params.id +".mp3");
    console.log(ctx.params.id);
    request(ctx.query.url).pipe(wstream).on("close", function(err){
        console.log("ok");
        stream  = fs.createReadStream(process.cwd()+"/temp/"+ ctx.params.id +".mp3");
        let responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
                responseData.push( chunk );
            });
            stream.on( 'end', function() {
                let finalData = Buffer.concat( responseData );
                ctx.response.status = 200;
                ctx.response.body =  finalData;
            });
        }
    });
});

module.exports = router;