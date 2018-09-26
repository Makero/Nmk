const request = require('../../utils/request');

module.exports = {

    getArticleDetail : async (opt) => {
        await request.GET_API("web", "/article/"+opt.params.id, opt);
    }

};