const AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
const APP_ID = "14390719";
const API_KEY = "4qZ9bC66RgGzdeigHRrc3ev0";
const SECRET_KEY = "gVQpOBLV6wMPzsoNHnkneHvTUS0D0mHL";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);


module.exports = client;