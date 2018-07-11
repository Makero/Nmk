const request = require('../utils/request');

module.exports = {

    isAuth : async (opt) => {
        await request.POST_API("wechat", "/auth", opt);
    }

};