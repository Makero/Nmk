const request = require('../utils/request_util'),
    path = request.apiPath;

module.exports = {

    getSong : async (opt) => {
        await request.GET_API_DATA(path.wechat+"/music", opt);
    },
    getSongLRC : async (opt) => {
        await request.GET_API_DATA(path.wechat+"/music_lrc", opt);
    }

};