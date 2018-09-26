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
            ctx.session = {
                id: ctx.api.data.id,
                name: ctx.api.data.user,
                sex: ctx.api.data.sex,
                introduction: ctx.api.data.introduction,
                head_path: ctx.api.data.head_path,
                token: authToken
            };
            await next();
        }
    }
};