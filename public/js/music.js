
const Music = {
    audio : $("#audio")[0],
    timer : 0, time : 0, roll : 0,
    play : function(tag){//播放、暂停音乐
        if(this.audio.paused){
            $(tag).removeClass("play").addClass("pause");
            $(".pic_radio").removeClass("paused");
            this.audio.play();
            this.progress(tag);
        }else{
            $(tag).removeClass("pause").addClass("play");
            $(".pic_radio").addClass("paused");
            this.audio.pause();
            clearInterval(this.timer);
        }
    },
    format : function(t,d){//时间格式化
        let minute = parseInt(t/60);
        let sec = t-(minute*60);
        if(!d){
            sec = parseInt(sec);
        }else{
            sec = sec.toFixed(d);
        }

        if(minute<10) minute = '0'+minute;
        if(sec<10) sec = '0'+sec;
        return minute+":"+sec
    },
    progress : function(tag){//时间进度
        const self = this;
        clearInterval(self.timer);
        this.timer = setInterval(function(){
            let ctime = self.audio.currentTime;
            let percent = ctime/self.time * 100;
            self.lrc_roll(self.format(ctime,2));
            $("#current").text(self.format(ctime));
            if(!self.audio.ended){
                $("#progress").width(percent+"%");
            }else{
                clearInterval(self.timer);
                $(tag).removeClass("pause").addClass("play");
                $(".pic_radio").addClass("paused");
            }

        },8);
    },
    lrc : function(){//获取歌词
        $.ajax({
            url : "/music/ajax/lrc",
            type : 'get',
            data : {songid : $("#songid").val()},
            success : function(result){
                $("#lrc").html(result);
            }
        })
    },
    lrc_roll : function(t){//歌词同步滚动
        $(".roll:not(:last)").removeClass("red");
        $("p[data-time='"+t+"']").addClass("roll red");
        if($("p[data-time='"+t+"']").hasClass("roll")){
            let n = $(".lrc-box .roll").length;
            this.roll = 30 * n;
            $("#lrc").scrollTop(this.roll);

        }

    }
};

(() => {
    /** 动态的加载中提示 **/
    const loading = $("#loading").attr("data-load");
    let n = 3;
    const timer = setInterval(function(){
        if(n===-1) n = 3;
        $("#loading").text(loading.substring(0,loading.length-n));
        n--;
    },500);

    /** 音乐加载完成后 **/
    Music.audio.addEventListener("canplaythrough", () => {
        clearInterval(timer);
        $("#loading").addClass("hide");
        $(".time").removeClass("hide");
        Music.time = Music.audio.duration;
        $("#duration").text(Music.format(Music.time));
        Music.lrc();
        $(".start").unbind("click").click(function(){
            Music.play(this);
        });
    }, false);
})();