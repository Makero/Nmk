function Work(){

	move(".faqbox").set("opacity","1").set("left","30px").duration('.8s').end();
	move(".video").set("opacity","1").set("right","30px").duration('.8s').end();
	move(".titl").set("opacity","1").duration('1.2s').end(function(){
		move(".cp").set("top","228px").duration('.6s').end();
		move(".cpdap").set("top","228px").duration('.6s').end(function(){
			move(".ht").set("top","440px").duration('1s').end();
			move(".htdap").set("top","440px").duration('1s').end();
			move(".cs").set("top","480px").duration('1.8s').end();
			move(".csdap").set("top","480px").duration('1.8s').end(function(){
				move(".yu").rotate(180).end(function(){
					move(".yu").set("opacity","1").duration('.5s').end();
					move(".yu").set("left","1100px").duration('1s').end(function(){
							move(".yu").rotate(90).set("top","450px").duration('1s').end(function(){
								move(".yu").rotate(0).duration('.8s').end();
								$(".yu").animate({top:'355px',left:'290px'},"slow");
							})
						});

				});

			});
		});
		move(".ui").set("top","238px").duration('1.4s').end();
		move(".uidap").set("top","228px").duration('1.4s').end();
		move(".qd").set("top","218px").duration('2.2s').end();
		move(".qddap").set("top","228px").duration('2.2s').end();
	});

	$(".cus").on("mouseenter",function(){
		move(this).scale(1.05).duration('.2s').end();
	});
	$(".cus").on("mouseleave",function(){
		move(this).scale(1).duration('.2s').end();
	});
	$(".yu").on("mouseenter",function(){
		move(this).rotate(180).end();
	});
	$(".yu").on("mouseleave",function(){
		move(this).rotate(0).end();
	})
}
