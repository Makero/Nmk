const request = require('../utils/request');

module.exports = {

    getSongURL : async (opt) => {
        await request.GET_API("wechat", "/music_url", opt);
    },
    getSongLRC : async (opt) => {
        await request.GET_API("wechat", "/music_lrc", opt);
    }

};