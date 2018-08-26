const request = require('request');
const envConfig = require('../config/env_config');

function requestOrderAPI(path, opt, method){

    console.log("\n----------------\n" + method+" API:" + envConfig.api.url + path + "\n----------------");

    return new Promise(function(resolve, reject) {
        request({
            method,
            url: envConfig.api.url + path,
            qs: opt.params,
            json: opt.params ||true,
            headers: {token: opt.token}
        },function(err,res,body){
            if(err){
                console.error(err);
                reject(err);
                return;
            }

            resolve(body);
        });
    });
}

URL = {
    web: '/api',
    wechat: '/api/wx'
};
module.exports = {

    GET_API : async (apiName, path, opt) => {

        opt.ctx.api = await requestOrderAPI(URL[apiName]+path, opt, 'GET');

    },

    POST_API : async (apiName, path, opt) => {

        opt.ctx.api = await requestOrderAPI(URL[apiName]+path, opt, 'POST');

    }

};