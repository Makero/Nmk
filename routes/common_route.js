const router = require('koa-router')();
const request = require('request');
const client = require('../utils/speech');
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
    await ctx.render('blog/index', {status});
});


/** 网站登录 **/
router.get('/login', async (ctx) => {
    const authToken = ctx.cookies.get('authToken');
    if(authToken){
        ctx.redirect('/navigation');
    }
    await ctx.render('blog/login');
});


/** 导航 **/
router.get('/navigation', async (ctx) => {
    await ctx.render('blog/navigation');
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
        const result = await client.text2audio(ctx.query.talk, {pit: 8, per: 4});
        ctx.status = 200;ctx.type = 'mp3';ctx.body = result.data;
    }catch(error){
        console.error("网络异常");
        ctx.body = fs.createReadStream(process.cwd()+'/public/audio/dropline.mp3');
    }
});


module.exports = router;
