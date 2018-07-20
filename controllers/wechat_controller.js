const request = require('../utils/request');

module.exports = {

    validateToken : async (opt) => {
        await request.GET_API("wechat", "/validate_token", opt)
    },
    msgHandle: async(opt) => {
        await request.POST_API("wechat", "/msg_handle", opt)
    },
    msgTalk: async(opt) => {
        await request.POST_API("wechat", "/msg_talk", opt)
    },
    qykTalk: async(opt) => {
        await request.POST_API("wechat", "/qing_yun_ke", opt)
    },
    wxConfig: async(opt) => {
        await request.POST_API("wechat", "/wx_config", opt)
    },
    loginCheck: async(opt) => {
        await request.POST_API("web", "/login_check", opt)
    },

};