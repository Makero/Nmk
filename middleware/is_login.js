const checkController = require('../controllers/check_controller');


module.exports = async (ctx, next)=>{

    const authToken = ctx.cookies.get('authToken');
    if(!authToken){
        ctx.redirect("/login?redirectURL=" + ctx.originalUrl);
    }else{
        // 验证authToken是否有效
        await checkController.checkAuthToken({
            ctx,
            params: {authToken}
        });
        if(ctx.api.code === '40001'){
            // authToken无效
            ctx.redirect("/login?redirectURL=" + ctx.originalUrl);
        }else{
            // authToken有效 保存用户信息
            //................
            await next();
        }
    }
};