const request = require('../utils/request_util');

module.exports = {
    getBaiDuCont : (opt) => {
        request.POST_API_DATA("/upload/",opt);
    }

};