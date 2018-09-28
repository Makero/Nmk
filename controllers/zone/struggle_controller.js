const request = require('../../utils/request');

module.exports = {

    postMood : async (opt) => {//发表心情
        await request.POST_API("web", "/mood/", opt);
    }

};