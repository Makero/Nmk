(() => {
    $.ajax({
        url: '/talk/ajax/wxConfig',
        type: 'post',
        success: function(result){
            console.log(result);
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appid, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名
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

        }
    });

    $("#sub").click(function(){
        $.ajax({
            url: "/talk/ajax/qyk",
            type: 'post',
            data: {talk:$("#talk").val()},
            success: function(result){
                $("#audio").attr("src","/play/speech?talk="+result);
            }
        });
    });

})();
