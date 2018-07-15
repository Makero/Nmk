(() => {
    wxCheckConfig('talk', ['startRecord', 'stopRecord', 'translateVoice']);

    document.body.addEventListener('touchstart', function () { });
    window.ontouchstart = function(e) {
        const event = e || window.event;
        event.preventDefault();
    };

    const tag = $("#start")[0];

    tag.addEventListener('touchstart',touch, false);
    tag.addEventListener('touchend',touch, false);

    function touch (eve){
        const event = eve || window.event;
        switch(event.type){
            case "touchstart":
                wx.startRecord();
                break;
            case "touchend":
                wx.stopRecord({
                    success: function (res) {
                        localId = res.localId;
                        wx.translateVoice({
                            localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                $.ajax({
                                    url: "/wechat/talk/ajax/qyk",
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
