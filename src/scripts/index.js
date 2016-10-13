//js的入口文件
//引入zepto
var $ = require("./components/zepto-modules/_custom");

require("./components/zepto-modules/ajax");
module.exports = $;




//引入iscroll
var IScroll = require("./components/iscroll/iscroll.js");



//设置iscoll对象默认为hide
$("#mainContent").hide();
$(".swiper-container").hide();

$("#introTitle").tap(function(){
	$("#mainContent").show();
	$(".swiper-container").hide();

	// console.log($.post());


	/*$.ajax({
	  type: 'GET',
	  url: '/api/skill',
	  // data to be added to query string:
	  // type of data we are expecting in return:
	  dataType: 'json',
	  timeout: 300,
	  success: function(data){
	   console.log(data.response)
	  },
	  error: function(xhr, type){
	    console.log(type)
	  }
	})*/
	//注： 后台console.log   "parsererror" ;未解析；json文件有错误；”json在线解析“在此网站解析；查找原因；

	//需要进行post请求；
	$.post("/api/skill",{}, function(response){
		// console.log(response);
		var html = "";
		for(var i = 0; i < response.length; i++){
			html += "<li>" + response[i].name + "</li>";
		}
		$("#scroller ul").html(html);	

		//此处IScroll是声明的那个名称；没有function函数；调用IScroll
		myScroll = new IScroll('#wrapper', {			
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})

	
})

//引入swiper

var Swiper = require('./components/swiper/swiper-3.3.1.min.js');

var SwiperAnimate = require("./components/swiper/swiper.animate1.0.2.min");
      //require js 时必须暴露接口；

var mySwiper = new Swiper ('.swiper-container', {

  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit

    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
    //用对象的形式调用方法；
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
})      

$("#footer div").tap(function(){

	var apiTarget = $(this).attr("id");
	//console.log("/api/" + apiTarget);


	$.post("/api/" + apiTarget,{}, function(response){
		var html = "";
		for(var i = 0; i < response.length; i++){
			html += "<li>" + response[i].category + "</li>";
		}
		$("#scroller ul").html(html);
	})
})

var interval = setInterval(function(){
	if(document.readyState === "complete"){
		clearInterval(interval);
		$("#preload").hide();
		$(".swiper-container").show();
		mySwiper.updateContainerSize();
		mySwiper.updateSlidesSize();
	}else{
		$("#preload").show();
	}
},500);





