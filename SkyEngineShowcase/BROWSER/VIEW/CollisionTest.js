SkyEngineShowcase.CollisionTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			x : -100,
			width : 40,
			height : 40,
			//centerY : 40,
			color : 'green',
			angle : 45,
			scaleX : 2
		}).appendTo(SkyEngine.Screen);
		
		let circle = SkyEngine.Circle({
			width : 60,
			height : 40,
			color : 'yellow',
			angle : 45,
			scale : 1.2
		}).appendTo(SkyEngine.Screen);
		
		let image = SkyEngine.Image({
			x : 100,
			src : SkyEngineShowcase.R('robot/idle1.png'),
			scale : 0.2,
			angle : 45
		}).appendTo(SkyEngine.Screen);
		
		rect.addCollider(rect);
		circle.addCollider(circle);
		
		circle.onMeet(SkyEngine.Rect, () => {
			console.log('Met!');
		});
		
		circle.onPart(SkyEngine.Rect, () => {
			console.log('Parted!');
		});
		
		/*// character
		let character = SkyEngine.Sprite({
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
		
		let delay = DELAY(1, () => {
			circle.stopRight();
			circle.moveDown(100);
			
			delay = DELAY(1, () => {
				
				circle.flipX();
				
				circle.stopDown();
				circle.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = DELAY(2, () => {
						
						circle.stopLeft();
						circle.moveUp(100);
						
						delay = DELAY(2, () => {
						
							circle.flipX();
							
							circle.stopUp();
							circle.moveRight(100);
							
							delay = DELAY(2, () => {
								
								circle.stopRight();
								circle.moveDown(100);
								
								delay = DELAY(2, () => {
									
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
		
		inner.on('close', () => {
			
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
