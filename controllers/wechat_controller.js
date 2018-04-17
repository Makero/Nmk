const request = require('../utils/request_util');

module.exports = {
    validateToken : async (opt) => {
        await request.GET_API_DATA("/validate/token",opt);
    }

};