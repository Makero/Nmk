const request = require('../utils/request_util');

module.exports = {

    isAuth : async (opt) => {
        await request.POST_API_DATA("/api/wechat/auth", opt);
    }

};