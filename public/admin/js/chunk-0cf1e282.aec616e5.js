(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cf1e282"],{"185a":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",class:{"full-screen":t.isScreen,animated:t.isAnimated,"top-floor":t.isTop},style:"left:calc(50% - "+t.width/2+"px);width:"+t.width+"px;height:"+t.height+"px",attrs:{"data-id":"container"}},[n("div",{staticClass:"title-bar",on:{mousedown:t.drag}},[n("span",{staticClass:"oper-btn",on:{mousedown:function(t){t.stopPropagation()}}},[n("i",{staticClass:"close",on:{click:t.close}}),n("i",{staticClass:"screen",on:{click:t.screen}})]),t._v(t._s(t.title))]),n("div",{staticClass:"content-box"},[t._t("default")],2)])},o=[],a=n("d225"),s=n("b0b4"),c=n("308d"),u=n("6bb5"),l=n("4e2b"),r=n("9ab4"),d=n("60a3"),p=function(t){function e(){var t;return Object(a["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.isScreen=!1,t.isAnimated=!0,t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"drag",value:function(t){var e=this;this.isAnimated=!1;var n=t.target.parentNode,i=n.getAttribute("data-id");"container"!==i&&(n=t.target.parentNode.parentNode);var o=t.clientX-n.offsetLeft,a=t.clientY-n.offsetTop;document.onmousemove=function(t){var e=t.clientX-o,i=t.clientY-a;i=i<=20?20:t.clientY-a,n.style.left=e+"px",n.style.top=i+"px"},document.onmouseup=function(){e.isAnimated=!0,document.onmousemove=document.onmouseup=null}}},{key:"close",value:function(){this.isScreen=!1,this.$emit("closeContainer")}},{key:"screen",value:function(){this.isScreen=!this.isScreen}},{key:"onFocus",value:function(t){this.isTop=!0}},{key:"mounted",value:function(){}}]),e}(d["c"]);r["a"]([Object(d["b"])({default:"窗口"})],p.prototype,"title",void 0),r["a"]([Object(d["b"])({default:!1})],p.prototype,"isTop",void 0),r["a"]([Object(d["b"])({default:800})],p.prototype,"width",void 0),r["a"]([Object(d["b"])({default:600})],p.prototype,"height",void 0),p=r["a"]([d["a"]],p);var f=p,b=f,v=(n("ded8"),n("2877")),h=Object(v["a"])(b,i,o,!1,null,"131d6ec5",null);e["default"]=h.exports},"8f1a":function(t,e,n){},ded8:function(t,e,n){"use strict";var i=n("8f1a"),o=n.n(i);o.a}}]);
//# sourceMappingURL=chunk-0cf1e282.aec616e5.js.map