const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const koa_logger = require('koa-logger');
const session = require('client-sessions');
const logger = require('./utils/logger');
const urls = require('./urls');


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

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

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
