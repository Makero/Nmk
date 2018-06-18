const router = require('koa-router')();
const request = require('request');
const client = require('../utils/speech_util');


function requestOrderAPI(path,obj){
    return new Promise(function(resolve, reject) {
        request({
            url:path,
            method:'get',
            qs: obj.params,
            json:true,
            encoding: null,
            headers:{token: obj.token}
        },function(err,res,body){
            if(err){
                console.error(err);
                return;
            }
            resolve(body);
        });
    });
}


router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

/** 音乐播放 **/
router.get('/play/music/:id', async (ctx, netx) => {
    const buffer = await requestOrderAPI(ctx.query.url, {});
    ctx.status = 200;ctx.type = 'mp3';ctx.body = buffer;
});

/** 语音合成 **/
router.get('/play/speech', async (ctx, next) => {
    const result = await client.text2audio(ctx.query.talk, {pit: 8, per: 4});
    ctx.status = 200;ctx.type = 'mp3';ctx.body = result.data;
});

module.exports = router;
