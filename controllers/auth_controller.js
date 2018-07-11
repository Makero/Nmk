const request = require('../utils/request_util'),
    path = request.apiPath;

module.exports = {

    isAuth : async (opt) => {
        await request.POST_API_DATA(path.wechat+"/auth", opt);
    }

};