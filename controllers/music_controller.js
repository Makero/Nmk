const request = require('../utils/request_util');

module.exports = {

    getSong : async (opt) => {
        await request.GET_API_DATA("/api/music", opt);
    },
    getSongLRC : async (opt) => {
        await request.GET_API_DATA("/api/music_lrc", opt);
    }

};