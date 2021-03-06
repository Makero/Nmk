const wxCheckConfig = (name, jsApiList) => {
    $.ajax({
        url: '/ajax/wxConfig',
        type: 'post',
        data: {'signame': name},
        success: function (result) {
            if (result === 'error') {
                console.log("不能调用微信jssdk,没有签名");
                return;
            }
            const arrObj = new Array();
            jsApiList = jsApiList || [];
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appid, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名
                jsApiList: arrObj.concat(['closeWindow'],jsApiList) // 必填，需要使用的JS接口列表
            });

            wx.checkJsApi({
                jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    console.log(res);
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });

            wx.ready(function () {

            });

            wx.error(function (res) {
                alert("抱歉，暂无法使用该功能");
            });

        },
        error: function (e) {
            console.error(e);
        }
    });
};