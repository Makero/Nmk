//==============================================================
//
//                common.js公共脚本文件
//Content : 主要包含表单提交、日期格式化、上传文件、浮动框居中
//Author  : Maker
//Date    : 2016-05
//version : 1.0.3
//
//==============================================================

/** 自定义方法 **/ //2018-07-08
$.fn.extend({
    //盒子居中
    'BoxCenter':function(params){
        const self = this;
        $(window).resize(function(){
            let l = ($(window).width() - $(self).width()) / 2;
            let t = ($(window).height() - $(self).height()) / 2;
            $(self).css({"top":t+"px","left":l+"px"});
        });
        $(window).resize();
        $(self).css('opacity',1);
        if(params && params.animate){
            $("#animate").addClass(params.animate);
		}
    },
	//表单数据格式化
    'serializeJSON':function(){
        let serializeObj={};
        $(this.serializeArray()).each(function(){
            serializeObj[this.name]=this.value.replace(/\s+/g,'');
        });
        return serializeObj;
	}
});


/*************************/
/*2016-05-21             */
/*************************/
//日期
var DateTime = {
	year  : "",
	month : "",
	day   : "",
	hour  : "",
	minute: "",
	second: "",
	//格式化日期
	getDate : function(str){
		this.init(str);
		return this.year + "-" + this.month + "-" + this.day;
	},
	//格式化时间
	getTime : function(str){
		this.init(str);
		return this.hour + ":" + this.minute + ":" + this.second;
	},
	//格式化全部
	getAll : function(str){
		this.init(str);
		return this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
	},
	//初始化
	init : function(str){
		var span   = Date.parse(str);
		var dt     = new Date(span);

		var year   = dt.getFullYear();
		var month  = dt.getMonth()+1;
		var day    = dt.getDate();
		var hour   = dt.getHours();
		var minute = dt.getMinutes();
		var second = dt.getSeconds();

		this.year   = year;
		this.month  = month  < 10 ? "0" + month  : month;
		this.day    = day    < 10 ? "0" + day    : day;
		this.hour   = hour   < 10 ? "0" + hour   : hour;
		this.minute = minute < 10 ? "0" + minute : minute;
		this.second = second < 10 ? "0" + second : second;
	}
};


/*************************/
/*2016-05-22/26          */
/*************************/
//文件上传
function File(posturl){
	this.URL     = window.URL || window.webkitURL;
	this.postUrl = "/upload";
	this.cancUrl = "/upload/cancel";
	this.form    = new FormData();
	this.type    = "";
	this.auto    = false;
	this.xhr     = new XMLHttpRequest();
	if(posturl){
		this.postUrl = posturl;
	}
}

//初始化组件
File.prototype.InitFile = function(option){	//option内置参数有：type(文件类型),auto(是否自动上传,默认为否),id(选择按钮的id),file_id(input标签文件的id)
	var _this = this;
	if(option.auto) this.auto = option.auto;
	if(option.type) this.type = option.type;
	$("#upload").html("<input type='file' class='dis' id='"+option.file_id+"' name='myfile' accept='"+option.type+"/*' multiple=''/><ul></ul>");
	var file_id = "#"+option.file_id;
	$(file_id).change(function(){
		$("#upload ul").html("");
		$("#uploadBtn,#cancleBtn").remove();
		_this.form = new FormData();

		var length = $(file_id)[0].files.length;
		for(var n=0;n<length;n++){
			var form_data = $(file_id)[0].files[n];
			if(form_data.type.split('/')[0] == option.type){
				_this.form.append("file",$(file_id)[0].files[n]);
				var name = $(file_id)[0].files[n].name;
				$("#upload ul").append("<li><i></i><span>"+name+"</span><em>0%</em></li>");
			}else{
				alert("上传的文件类型不对将不会被上传！");
			}
		}
		if(this.auto){
			$(option.id).attr("disabled","disabled");
			option.before();
			_this.Upload(function(){
				setTimeout(function(){
					$("#upload ul").html("");
					$(option.id).removeAttr("disabled");
					option.success();
				},1000);
			});
			return;
		}
		if(length && form_data.type.split('/')[0] == option.type){
			$("#upload").append("<button id='cancleBtn' class='cancleBtn'>取消上传</button><button id='uploadBtn' class='uploadBtn'>上传文件</button>");
			option.before();
		}
	});
	//上传按钮
	$("#upload").off().on("click","#uploadBtn",function(){
		$(this).attr("disabled","disabled");
		_this.Upload(function(){
			setTimeout(function(){
				$("#upload ul").html("");
				$("#uploadBtn,#cancleBtn").remove();
				option.success(1);
			},1000);
		});
	});
	//取消按钮
	$("#upload").on("click","#cancleBtn",function(){
		_this.xhr.abort();
		$.ajax({
			url:_this.cancUrl,
			type:"post",
			data:{accept:_this.type},
			success:function(){

			}
		});
		$("#upload ul").html("");
		$("#uploadBtn,#cancleBtn").remove();
		option.success(0);
	});
};
//上传头像
File.prototype.HeadPortrait = function(file_id,head_id,callback){
	var form = new FormData();
	var form_data = $(file_id)[0].files[0];
	if(form_data.type.split('/')[0] != "image"){alert("必须上传图片！");return;}
	var objUrl = this.URL.createObjectURL($(file_id)[0].files[0]);
	form.append("file",$(file_id)[0].files[0]);
	this.form = form;
	$("#"+head_id).attr("src",objUrl);
	this.Upload();
	callback(form_data.name);
};
//上传进度
File.prototype.Progress = function(evt){
	if (evt.lengthComputable) {
    	var perc = Math.round(evt.loaded / evt.total * 100);
    	$("#upload ul i").width(perc+"%");
    	$("#upload ul em").html(perc + "%");
    }
};
//上传文件
File.prototype.Upload = function(callback){
	var xhr  = new XMLHttpRequest();
	this.xhr = xhr;
    xhr.open("post", this.postUrl, true);
    xhr.setRequestHeader("Accept",this.type);
    xhr.upload.addEventListener("progress", this.Progress, false);
    xhr.send(this.form);
    xhr.onload = function (e){
    	switch(xhr.status){
			case 200 : callback();break;//上传成功后回调函数
			case 404 : alert("无法找到指定位置！");break;
			case 500 : alert("服务器遇到意料不到的情况,不能完成请求！");break;
			case 504 : alert("网关超时");break;
			default  : alert("头像上传失败！");break;
		}
    	
    };
};

/*************************/
/*2016-05-27/28          */
/*************************/
//手机触摸事件
function Touch(id){
	this.id = id;
	this.sx = 0;
	this.sy = 0;
	this.mx = 0;
	this.my = 0;
}
//手指触摸屏幕时候触发
Touch.prototype.start = function(callback){
	var self = this;
	$(self.id)[0].addEventListener("touchstart", function(e){
		self.sx = e.touches[0].pageX;
		self.sy = e.touches[0].pageY;
		callback(e);
	}, false);
};
//手指在屏幕上滑动的时候连续地触发
Touch.prototype.move  = function(callback){
	var self = this;
	self.id.addEventListener("touchmove", function(e){
		self.mx = e.touches[0].pageX;
		self.my = e.touches[0].pageY;
		callback(e);
	}, false);
};
//手指从屏幕上离开的时候触发
Touch.prototype.end  = function(callback){
	this.id.addEventListener("touchend", callback, false);
};

/** 中文转码 **/
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

/** 获取url参数 **/
function getRequest(path) {
    var url = path || window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +";path=/";
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
}

/** 随机生成字符串 **/
function randomString(len) {
    len = len || 8;
    const $chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
