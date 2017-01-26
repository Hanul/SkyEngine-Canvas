SkyEngineShowcase.CollisionTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// rect
		rect = SkyEngine.Rect({
			x : -100,
			width : 40,
			height : 40,
			//centerY : 40,
			color : 'green',
			angle : 45,
			scaleX : 2
		}).appendTo(SkyEngine.Screen),
		
		// circle
		circle = SkyEngine.Circle({
			width : 60,
			height : 40,
			color : 'yellow',
			angle : 45,
			scale : 1.2
		}).appendTo(SkyEngine.Screen),
		
		// image
		image = SkyEngine.Image({
			x : 100,
			src : SkyEngineShowcase.R('robot/idle1.png'),
			scale : 0.2,
			angle : 45
		}).appendTo(SkyEngine.Screen),
		
		// delay
		delay;
		
		rect.addCollider(rect);
		circle.addCollider(circle);
		
		circle.onMeet(SkyEngine.Rect, function() {
			console.log('Met!');
		});
		
		circle.onPart(SkyEngine.Rect, function() {
			console.log('Parted!');
		});
		
		/*// character
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
			scale : 0.2
		}).appendTo(SkyEngine.Screen);*/
		
		circle.moveRight(100);
		
		delay = DELAY(1, function() {
			circle.stopRight();
			circle.moveDown(100);
			
			delay = DELAY(1, function() {
				
				var
				// repeat.
				repeat;
				
				circle.flipX();
				
				circle.stopDown();
				circle.moveLeft(100);
				
				repeat = RAR(function() {
				
					delay = DELAY(2, function() {
						
						circle.stopLeft();
						circle.moveUp(100);
						
						delay = DELAY(2, function() {
						
							circle.flipX();
							
							circle.stopUp();
							circle.moveRight(100);
							
							delay = DELAY(2, function() {
								
								circle.stopRight();
								circle.moveDown(100);
								
								delay = DELAY(2, function() {
									
									circle.flipX();
									
									circle.stopDown();
									circle.moveLeft(100);
									
									repeat();
								});
							});
						});
					});
				});
			});
		});
		
		inner.on('close', function() {
			
			rect.remove();
			rect = undefined;
			
			circle.remove();
			circle = undefined;
			
			image.remove();
			image = undefined;
			
			//character.remove();
			character = undefined;
			
			delay.remove();
			delay = undefined;
		});
	}
});
