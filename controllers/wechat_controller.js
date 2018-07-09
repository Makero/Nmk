const request = require('../utils/request_util');

module.exports = {

    validateToken : async (opt) => {
        await request.GET_API_DATA("/api/validate_token", opt);
    },
    msgHandle: async(opt) => {
        await request.POST_API_DATA("/api/msg_handle", opt)
    },
    msgTalk: async(opt) => {
        await request.POST_API_DATA("/api/msg_talk", opt)
    },
    qykTalk: async(opt) => {
        await request.POST_API_DATA("/api/qing_yun_ke", opt)
    },
    wxConfig: async(opt) => {
        await request.POST_API_DATA("/api/wx_config", opt)
    },
    identityCheck: async(opt) => {
        await request.POST_API_DATA("/api/identity_check", opt)
    },

};