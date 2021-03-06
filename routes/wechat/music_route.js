const router = require('koa-router')();
const songController = require('../../controllers/music_controller');


router.get('/', async (ctx, next) => {

    if(ctx.query.songid === undefined){
        ctx.body = "参数错误！";
        return;
    }
    await songController.getSongURL({
        ctx,
        params: {songid:ctx.query.songid.split(',')[0]}
    });

    if(ctx.api.data.errno){
        ctx.body = "音乐不存在";
        return;
    }
    await ctx.render('wechat/music/music', {
        title: '音乐',
        data: ctx.api.data
    })
});


router.get('/ajax/lrc', async(ctx, next) => {
    await songController.getSongLRC({
        ctx,
        params: ctx.query
    });
    let arr = '',lrcArr = [];
    if(!ctx.api.data.error_code){
        /** 将歌词文本转化成数组类型 **/
        arr = ctx.api.data.lrcContent.replace(/\r/g,'').split('\n');
        for(let n in arr){
            arr[n].replace(/(\[.*\])/, function(rs, $1, offset, source){
                let lrc = source.replace($1,'');
                let time = $1.replace('[','').replace(']','');
                if (!RegExp(/[a-z]/g).test(time)){
                    let temp = time.split(".");
                    if(temp[1].length === 1) temp[1] = "0"+temp[1];
                    time = temp[0] +"."+ temp[1];
                    lrcArr.push([time, lrc]);
                }

            });
        }
    }
    await ctx.render('wechat/music/part/lrc', {list: lrcArr});
});


module.exports = router;