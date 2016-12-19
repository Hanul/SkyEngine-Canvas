SkyEngineShowcase.MovingTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// character
		character,
		
		// character2,
		character2,
		
		// character3,
		character3,
		
		// delay
		delay;
		
		character = SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png'),
				SkyEngineShowcase.R('robot/run5.png'),
				SkyEngineShowcase.R('robot/run6.png'),
				SkyEngineShowcase.R('robot/run7.png'),
				SkyEngineShowcase.R('robot/run8.png')
			],
			fps : 10,
			scale : 0.5,
			angle : 10,
			c : [character2 = SkyEngine.Sprite({
				srcs : [
					SkyEngineShowcase.R('robot/run1.png'),
					SkyEngineShowcase.R('robot/run2.png'),
					SkyEngineShowcase.R('robot/run3.png'),
					SkyEngineShowcase.R('robot/run4.png'),
					SkyEngineShowcase.R('robot/run5.png'),
					SkyEngineShowcase.R('robot/run6.png'),
					SkyEngineShowcase.R('robot/run7.png'),
					SkyEngineShowcase.R('robot/run8.png')
				],
				fps : 10,
				scale : 0.5
			}), character3 = SkyEngine.Sprite({
				srcs : [
					SkyEngineShowcase.R('robot/run1.png'),
					SkyEngineShowcase.R('robot/run2.png'),
					SkyEngineShowcase.R('robot/run3.png'),
					SkyEngineShowcase.R('robot/run4.png'),
					SkyEngineShowcase.R('robot/run5.png'),
					SkyEngineShowcase.R('robot/run6.png'),
					SkyEngineShowcase.R('robot/run7.png'),
					SkyEngineShowcase.R('robot/run8.png')
				],
				fps : 10,
				scale : 0.5
			})]
		}).appendTo(SkyEngine.Screen);
		
		character.moveRight(100);
		
		delay = DELAY(1, function() {
			character.stopRight();
			character.moveDown(100);
			
			delay = DELAY(1, function() {
				
				var
				// repeat.
				repeat;
				
				character.flipX();
				
				character.stopDown();
				character.moveLeft(100);
				
				repeat = RAR(function() {
				
					delay = DELAY(2, function() {
						
						character.stopLeft();
						character.moveUp(100);
						
						delay = DELAY(2, function() {
						
							character.flipX();
							
							character.stopUp();
							character.moveRight(100);
							
							delay = DELAY(2, function() {
								
								character.stopRight();
								character.moveDown(100);
								
								delay = DELAY(2, function() {
									
									character.flipX();
									
									character.stopDown();
									character.moveLeft(100);
									
									repeat();
								});
							});
						});
					});
				});
			});
		});
		
		character2.moveTo({
			toX : 100,
			accel : 100
		});
		
		character3.moveTo({
			toX : 100,
			toY : 100,
			accel : 100
		});
		
		inner.on('close', function() {
			
			character.remove();
			character = undefined;
			
			delay.remove();
			delay = undefined;
		});
	}
});
