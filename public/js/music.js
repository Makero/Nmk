(() => {
    $(".start").click(function(){
        if($(this).hasClass("play")){
            $(this).removeClass("play").addClass("pause");
        }else{
            $(this).removeClass("pause").addClass("play");
        }
    });
})();