const request = require('../utils/request');

module.exports = {

    checkAuthToken : async (opt) => {
        await request.POST_API("web", "/check_authToken", opt);
    }

};