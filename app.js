const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const logUtil = require('./utils/log_util');
const urls = require('./urls');


// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'html',
  map:{html: 'swig'}
}));

// logger **
app.use(async (ctx, next) => {
  const start = new Date();//响应开始时间
  let ms;//响应间隔时间
  try {
    await next();//开始进入到下一个中间件
    ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    logUtil.logResponse(ctx, ms);//记录响应日志
  } catch (error) {
    ms = new Date() - start;
    logUtil.logError(ctx, error, ms);//记录异常日志
  }
});


// routes **
for(const url in urls){
	let mk = require(urls[url]);
	mk.prefix(url); //绑定路由
	app.use(mk.routes(), mk.allowedMethods());
}

module.exports = app;
