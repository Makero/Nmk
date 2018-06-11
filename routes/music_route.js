const router = require('koa-router')();
const songController = require('../controllers/music_controller');

router.get('/', async (ctx, next) => {
    console.log(ctx.query);
    await songController.getSong({
        ctx,
        params: {songid:ctx.query.songid.split(',')[0]}
    });
    console.log(ctx.api);
    await ctx.render('music/music', {
        title: '音乐',
        data: ctx.api.data
    })
});

router.get('/ajax/lrc', async(ctx, next) => {
    await songController.getSongLRC({
        ctx,
        params: ctx.query
    });
    let arr = '';
    if(!ctx.api.data.error_code){
        /** 将歌词文本转化成数组类型 **/
        arr = ctx.api.data.lrcContent.replace(/\r/g,'').split('\n');
        for(let n in arr){
            arr[n].replace(/(\[.*\])/, function(rs, $1, offset, source){
                let lrc = source.replace($1,'');
                let time = $1.replace('[','').replace(']','');
                let temp = time.split(".");
                if(temp[1].length === 1) temp[1] = "0"+temp[1];
                time = temp[0] +"."+ temp[1];
                arr[n] = [time, lrc];
            });
            if(typeof(arr[n]) === "string"){
                arr[n] = [0, arr[n]];
            }
        }
    }
    await ctx.render('music/part/lrc', {list: arr});
});
module.exports = router;