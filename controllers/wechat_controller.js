const request = require('../utils/request_util');

module.exports = {

    validateToken : async (opt) => {
        await request.GET_API_DATA("/api/validate_token", opt);
    },
    msgHandle: async(opt) => {
        await request.POST_API_DATA("/api/msg_handle", opt)
    }

};