const request = require('../utils/request');

module.exports = {

    getSong : async (opt) => {
        await request.GET_API("wechat", "/music", opt);
    },
    getSongLRC : async (opt) => {
        await request.GET_API("wechat", "/music_lrc", opt);
    }

};