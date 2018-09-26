Flower = {
	top   : -60,
	left  : 10,
	high  : 680,
	obj   : null,
	path  : "",
	Create: function(){
		this.left = Math.random()*($(window).width()-100);
		const n = Math.ceil(Math.random()*6);
		$(".flower ul").append("<li></li>");
		$flower = $(".flower ul li:last-child");
		this.obj = $flower;
		$flower.css({"background-image":"url("+this.path+n+".png)","top":this.top+"px","left":this.left+"px","transition":"all 10s linear"});
		return this;
	},
	Animation:function(){
		$li = this.obj;
		const _this = this;
		const pos = Math.random()*1000;
		setTimeout(function(){
			$li.css({"top":_this.high+"px","left":pos+"px"});
		},30);
		return this;
	},
	Remove : function(){
		setTimeout(function(){
			$(".flower li:first-child").remove();
		},10500);
	},
	Init : function(path){
		if(path) {
            this.path = path;
            this.Create().Animation().Remove();
        } else {
            console.error("没有设置图片路径");
        }
	}
};