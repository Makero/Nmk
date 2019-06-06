const router = require('koa-router')();
const request = require('request');
const speech = require('../utils/speech');
const wordRec = require('../utils/word_recognition');
const fs = require('fs');
const isLogin = require('../middleware/is_login');
const wechatController = require('../controllers/wechat_controller');


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


/** 网站首页 **/
router.get('/', async (ctx) => {
    const authToken = ctx.cookies.get('authToken');
    let status = 1;
    if(authToken){
        status = 0;
        ctx.redirect('/navigation');
    }
    await ctx.render('zone/welcome', {status});
});

/** 后台管理 **/
router.get('/admin', async (ctx) => {
  await ctx.render('admin');
});

/** 网站登录 **/
router.get('/login', async (ctx) => {
    const authToken = ctx.cookies.get('authToken');
    if(authToken){
        ctx.redirect('/navigation');
    }
    await ctx.render('zone/login');
});


/** 导航 **/
router.get('/navigation', async (ctx) => {
    await ctx.render('zone/navigation');
});


/** 登录 身份校验 **/
router.post('/ajax/loginCheck', async (ctx) => {
    await wechatController.loginCheck({
        ctx,
        params: ctx.request.body
    });
    ctx.body = ctx.api;
});


/** 获取jsapi签名 **/
router.post('/ajax/wxConfig', async (ctx) => {
    await wechatController.wxConfig({
        ctx,
        params: ctx.request.body
    });

    if(ctx.api.code === '20001'){

        ctx.body = ctx.api.data;

    }else{

        console.error(ctx.api);
        ctx.body = 'error';

    }
});


/** 文章保存 **/
router.post('/article/save', async (ctx) => {
    /*await ctx.render();*/
});


/** 音乐播放 **/
router.get('/play/music/:id', async (ctx) => {
    const buffer = await requestOrderAPI(ctx.query.url, {});
    ctx.status = 200;ctx.type = 'mp3';ctx.body = buffer;
});


/** 语音合成 **/
router.get('/play/speech', async (ctx) => {
    try{
        const result = await speech.text2audio(ctx.query.talk, {pit: ctx.query.pit||8, per: ctx.query.per||4, spd: ctx.query.spd||5, vol: 15});
        ctx.status = 200;ctx.type = 'mp3';ctx.body = result.data;
    }catch(error){
        console.error("网络异常");
        if(ctx.state.root_url){
            ctx.body = fs.createReadStream(ctx.state.media_path+'/audio/dropline.mp3');
        }else {
            ctx.body = fs.createReadStream(process.cwd() + '/public/media/audio/dropline.mp3');
        }
    }
});

router.post('/word/recognition', async (ctx) => {

    const url = ctx.request.body.url;

    // 调用通用文字识别, 图片参数为本地图片
    const result = await wordRec.generalBasicUrl(url);
    console.log(result);
    ctx.body = result;
});

module.exports = router;
