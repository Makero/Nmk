const request = require('../../utils/request');

module.exports = {

    getMood : async (opt) => {
        await request.GET_API("web", "/mood/", opt);
    }

};