/**
 *
 * 配置静态文件请求地址
 * 参数URL为静态文件的地址，本地开发不设置值，调用项目内部的静态文件
 * 项目部署，将项目中的静态文件全部拷贝到nginx代理的静态文件地址根目录下
 * 并将其设置成nginx代理的静态文件的地址
 *
 **/
//const URL = "http://localhost/mkfile";
const URL = "";
module.exports = {
    zone_static     : URL + "/static/zone",
    wechat_static   : URL + "/static/wechat",
    common_static   : URL + "/static/common",
    media_path      : URL + "/media",
    root_url        : URL
};