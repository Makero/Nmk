
const Music = {
    audio : $("#audio")[0],
    timer : 0,
    time : 0,
    play : function(tag){
        if(this.audio.paused){
            $(tag).removeClass("play").addClass("pause");
            $(".pic_radio").removeClass("paused");
            this.audio.play();
        }else{
            $(tag).removeClass("pause").addClass("play");
            $(".pic_radio").addClass("paused");
            this.audio.pause();
        }
    },
    format : function(t){
        let minute = parseInt(t/60);
        let sec = parseInt(t-(minute*60));
        if(minute<10) minute = '0'+minute;
        if(sec<10) sec = '0'+sec;
        return minute+":"+sec
    },
    progress :function(tag){
        const self = this;
        clearInterval(self.timer);
        this.timer = setInterval(function(){
            let ctime = self.audio.currentTime;
            let percent = ctime/self.time * 100;
            $("#current").text(self.format(ctime));
            if(!self.audio.ended){
                $("#progress").width(percent+"%");
            }else{
                clearInterval(self.timer);
                $(tag).removeClass("pause").addClass("play");
                $(".pic_radio").addClass("paused");
            }

        },100);
    },
    lrc : function(){
        $.ajax({
            url : "/music/ajax/lrc",
            type : 'get',
            data : {songid : $("#songid").val()},
            success : function(result){
                console.log(result);
            }
        })
    }
};

(() => {
    const loading = $("#loading").attr("data-load");
    let n = 3;
    const timer = setInterval(function(){
        if(n===-1) n = 3;
        $("#loading").text(loading.substring(0,loading.length-n));
        n--;
    },500);
    Music.lrc();
    Music.audio.addEventListener("canplaythrough", () => {
        clearInterval(timer);
        $("#loading").addClass("hide");
        $(".time").removeClass("hide");
        Music.time = Music.audio.duration;
        $("#duration").text(Music.format(Music.time));
        $(".start").click(function(){
            Music.play(this);
            Music.progress(this);
        });
    }, false);
})();