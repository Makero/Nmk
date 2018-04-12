const request = require('request');
const envConfig = require('../config/env_config');


module.exports = {

    GET_API_DATA : (path,opt) => {

        request({
            url : envConfig.api.url + path,
            qs : opt.params,
            json : true,
            headers : {
                token : ''
            },
            timeout :envConfig.api.timeout
        }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log(body) // 打印google首页
                opt.callback(body);
            }else{
                console.error(err);
            }
        })
    }

};