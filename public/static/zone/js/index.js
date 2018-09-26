flashChange();
$(window).resize(function(){
	flashChange();
});
/**
根据窗口大小定位flash人物的位置
**/
function flashChange(){
	var w  = $("header").width();
	$("#swf").height(w*0.195);
}

$(".modelOne").bind("click",function(){
	$('body').animate({'scrollTop':"680px"},300);
});