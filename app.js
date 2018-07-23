const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const koa_logger = require('koa-logger');
const logger = require('./utils/logger');
const urls = require('./urls');
const session = require('koa-session');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(koa_logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'html',
  map:{html: 'swig'}
}));
app.keys = ['somesecrethurr'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// logger **
app.use(async (ctx, next) => {
  const start = new Date();//响应开始时间
  let ms;//响应间隔时间
  try {
    await next();//开始进入到下一个中间件
    ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    logger.logResponse(ctx, ms);//记录响应日志
  } catch (error) {
    ms = new Date() - start;
    console.error(error);
    logger.logError(ctx, error, ms);//记录异常日志
  }
});


// routes **
for(const url in urls){
	let mk = require(urls[url]);
	mk.prefix(url); //绑定路由
	app.use(mk.routes(), mk.allowedMethods());
}

module.exports = app;
