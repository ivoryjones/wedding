
			
			var snowARR = new Array();
			
			
			var Snow = function(id)
			{
				this.com = "snow" + id;
				this.html = '<div id="' + this.com + '" class="snow"><div class="snowInner snowTween"><div class="snowFlake"></div></div></div>';
			};		
			
			Snow.prototype.setVals = function()
			{
				
				this.sx = Math.floor(Math.random() * (310 - 10) + 10);
				this.fx = Math.round(Math.random() * (50 + -50) + -50);
				this.fy = Math.round(Math.random() * (-10 + -50) + -50);
				this.fr = Math.floor(Math.random() * 360);
				this.fr_x = Math.round(Math.random() * (100 - -100) + -100);
				this.fr_y = Math.round(Math.random() * (100 - -100) + -100);
				this.fall = Math.round(Math.random() * (20 - 4) + 4) + Math.floor(Math.random() * 100) / 100;
			};
			
			Snow.prototype.build = function()
			{
				this.css = 	{
								"visibility"		: "visible",
								"-webkit-animation"	: "snowFall " + this.fall + "s linear",
								"animation"	: "snowFall " + this.fall + "s linear"
							};
							
				this.x_placement = 	{
										"-webkit-transform"	: "translateX(" + this.sx + "px)",
										"transform"	: "translateX(" + this.sx + "px)"
									};
									
				this.flake_css = 	{
										"-webkit-transform" : "translate(" + this.fx + "px, " + this.fy + "px) rotate(" + this.fr + "deg)",
										"transform" : "translate(" + this.fx + "px, " + this.fy + "px) rotate(" + this.fr + "deg)"
									};
									
				this.sprite_css = 	{
										"-webkit-transform-origin" : this.fr_x + "px " + this.fr_y + "px", 
										"-webkit-animation"	: "snowFallTurn " + (this.fall * 0.5) + "s ease-in-out infinite",
										"transform-origin" : this.fr_x + "px " + this.fr_y + "px", 
										"animation"	: "snowFallTurn " + (this.fall * 0.5) + "s ease-in-out infinite"
									};
			};
			
			Snow.prototype.reRun = function()
			{
				this.d = setTimeout(testOneMove, 50, this);
			};
			
			
			function setup()
			{
				testOne(false);
			}
			
			function testOne(useOne)
			{
				if(useOne)
				{
					var f = new Snow(0);
					
					f.setVals();
					f.build();
					
					snowARR.push(f);
					
					$("#temp").prepend(f.html);
					
					testOneMove(f);
				}
				
				else
				{
					for(var i = 0; i < 60; i++)
					{
						var s = new Snow(i);
						
						s.setVals();
						s.build();
						
						snowARR.push(s);
						
						$("#temp").prepend(s.html);
						
						testOneMove(s);					
					}
				}
			}
			
			function testOneMove(ob)
			{
				$("#" + ob.com).css(ob.x_placement);
				
				$("#" + ob.com + " .snowTween").css(ob.css);
				
				$("#" + ob.com + " .snowInner").css(ob.flake_css);
				
				$("#" + ob.com + " .snowFlake").css(ob.sprite_css);
				
				$("#" + ob.com + " .snowTween").get(0).addEventListener("webkitAnimationEnd", testOneEnd, false);
				$("#" + ob.com + " .snowTween").get(0).addEventListener("animationend", testOneEnd, false);
			}
			
			function testOneEnd(event)
			{
				var TARG = event.target.parentElement.id;
				
				$("#" + TARG + " .snowTween").get(0).removeEventListener("webkitAnimationEnd", testOneEnd, false);
				$("#" + TARG + " .snowTween").get(0).removeEventListener("animationend", testOneEnd, false);
				
				$("#" + TARG + " .snowTween").removeAttr('style');
				
				for(var i in snowARR)
				{
					if(snowARR[i].com === TARG)
					{
						snowARR[i].setVals();
						snowARR[i].build();
						snowARR[i].reRun();
					}
				}
			}
//setup();

$(document).ready(function(){ setup(); });