const request = require('request');
const envConfig = require('../config/env_config');


module.exports = {

    GET_API_DATA : (path,opt) => {

        console.log("GET 调用API："+ envConfig.api.url + path);
        request({
            url : envConfig.api.url + path,
            method: "GET",
            qs : opt.params,
            json : true,
            headers : {
                token : ''
            },
            timeout :envConfig.api.timeout
        }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                opt.callback(body);
            }else{
                console.error(err);
            }
        })

    },

    POST_API_DATA : (path,opt) => {

        console.log("POST 调用API："+ envConfig.api.url + path);
        request({
            url : envConfig.api.url + path,
            method: "POST",
            qs : opt.params,
            json : true,
            headers : {
                token : ''
            },
            timeout :envConfig.api.timeout
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                opt.callback(body);
            }else{
                console.error(err);
            }
        })

    }

};