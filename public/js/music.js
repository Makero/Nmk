(() => {

    $(".start").click(function(){
        if($(this).hasClass("play")){
            $(this).removeClass("play").addClass("pause");
            $(".pic_radio").removeClass("paused");
            $("#audio")[0].play();
        }else{
            $(this).removeClass("pause").addClass("play");
            $(".pic_radio").addClass("paused");
            $("#audio")[0].pause();
        }
    });

})();