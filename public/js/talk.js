(() => {
    $.ajax({
        url: '/talk/ajax/wxConfig',
        type: 'post',
        success: function(result){
            console.log(result);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appid, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名
                jsApiList: ['startRecord', 'stopRecord', 'translateVoice'] // 必填，需要使用的JS接口列表
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

    document.body.addEventListener('touchstart', function () { });
    window.ontouchstart = function(e) {
        e.preventDefault();
    };

    var tag = $("#start")[0];

    tag.addEventListener('touchstart',touch, false);
    tag.addEventListener('touchend',touch, false);

    function touch (event){
        var event = event || window.event;


        switch(event.type){
            case "touchstart":
                console.log("1");
                wx.startRecord();
                break;
            case "touchend":
                console.log("2");
                wx.stopRecord({
                    success: function (res) {
                        localId = res.localId;
                        wx.translateVoice({
                            localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                $.ajax({
                                    url: "/talk/ajax/qyk",
                                    type: 'post',
                                    data: {talk:res.translateResult},   // 语音识别的结果
                                    success: function(result){
                                        $("#audio").attr("src","/play/speech?talk="+result);
                                    }
                                });
                            }
                        });
                    }
                });
                break;
        }

    }



})();
