const request = require('../utils/request_util'),
    path = request.apiPath;

module.exports = {

    validateToken : async (opt) => {
        await request.GET_API_DATA(path.wechat+"/validate_token", opt);
    },
    msgHandle: async(opt) => {
        await request.POST_API_DATA(path.wechat+"/msg_handle", opt)
    },
    msgTalk: async(opt) => {
        await request.POST_API_DATA(path.wechat+"/msg_talk", opt)
    },
    qykTalk: async(opt) => {
        await request.POST_API_DATA(path.wechat+"/qing_yun_ke", opt)
    },
    wxConfig: async(opt) => {
        await request.POST_API_DATA(path.wechat+"/wx_config", opt)
    },
    identityCheck: async(opt) => {
        await request.POST_API_DATA(path.web+"/identity_check", opt)
    },

};