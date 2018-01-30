$(function() {
    var animateName,$Div;
    var slider = $.fn.fsvs({
        speed: 300,
        bodyID: 'fsvs-body',
        selector: '> .slide',
        mouseSwipeDisance: 40,
        afterSlide: function (n) {
            $Div.show();
            $Div.addClass(animateName).show();
        },
        beforeSlide: function (n) {
            $Div = $($(".slide")[n]).children(".animated");
            animateName = $Div.attr("data-animate");
            $Div.removeClass(animateName).hide();
        },
        endSlide: function () {
        },
        mouseWheelEvents: true,
        mouseWheelDelay: false,
        scrollabelArea: 'scrollable',
        mouseDragEvents: true,
        touchEvents: true,
        arrowKeyEvents: true,
        pagination: true,
        nthClasses: false,
        detectHash: true
    });

    $("#write").MKtypewriter(60);
});