const request = require('../../utils/request');

module.exports = {

    getArticleList : async (opt) => {
        await request.GET_API("web", "/article", opt);
    }

};