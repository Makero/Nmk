const request = require('../utils/request_util');

module.exports = {
    getBaiDuCont : (opt) => {
        request.GET_API_DATA("/photo",opt);
    }

};