const AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
const APP_ID = '9005055';
const API_KEY = 'EZBl2T4NwCs2TyADthxwCnNz';
const SECRET_KEY = 'd0619836d8fa970fe330e823d64b3318';

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


module.exports = client;