wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxe8d8d0e68153a7c2', // 必填，公众号的唯一标识
    timestamp: '1529249755', // 必填，生成签名的时间戳
    nonceStr: 'Wm3WZYTPz2xwyzaW', // 必填，生成签名的随机串
    signature: '211024667ab5acabcadb96336d52e48fef20a937',// 必填，签名
    jsApiList: ['startRecord', 'stopRecord'] // 必填，需要使用的JS接口列表
});

wx.ready(function(){

});

wx.error(function(res){
    console.error(res);
});

wx.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        console.log(res);
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
});