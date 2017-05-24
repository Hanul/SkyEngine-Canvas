SkyEngineShowcase.IntersectionTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let line = SkyEngine.Line({
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10,
			border : '5px solid red'
		}).appendTo(SkyEngine.Screen);
		
		line.addCollider(SkyEngine.Line({
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10
		}));
		
		let circle = SkyEngine.Circle({
			x : 50,
			y : -50,
			width : 60,
			height : 40,
			color : 'green',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Circle!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		circle.addCollider(SkyEngine.Circle({
			width : 60,
			height : 40
		}));
		
		let line2 = SkyEngine.Line({
			x : 50,
			y : -50,
			startX : -100,
			startY : 10,
			endX : 100,
			endY : -10,
			border : '5px solid red'
		}).appendTo(SkyEngine.Screen);
		
		line2.addCollider(SkyEngine.Line({
			startX : -100,
			startY : 10,
			endX : 100,
			endY : -10
		}));
		
		let circles = [];
		
		line2.onMeet(SkyEngine.Line, (line) => {
			
			let intersectionPoint = SkyEngine.Util.Collision.findIntersectionPoint(
				
				line.getDrawingX(),
				line.getDrawingY(),
				line.getStartX(),
				line.getStartY(),
				line.getEndX(),
				line.getEndY(),
				line.getRealScaleX(),
				line.getRealScaleY(),
				line.getRealSin(),
				line.getRealCos(),
				
				line2.getDrawingX(),
				line2.getDrawingY(),
				line2.getStartX(),
				line2.getStartY(),
				line2.getEndX(),
				line2.getEndY(),
				line2.getRealScaleX(),
				line2.getRealScaleY(),
				line2.getRealSin(),
				line2.getRealCos()
			);
			
			circles.push(SkyEngine.Circle({
				x : intersectionPoint.x,
				y : intersectionPoint.y,
				width : 10,
				height : 10,
				color : 'yellow'
			}).appendTo(SkyEngine.Screen));
		});
		
		line2.onMeet(SkyEngine.Circle, (circle) => {
			
			let intersectionPoints = SkyEngine.Util.Collision.findCircleIntersectionPoints(
				
				line2.getDrawingX(),
				line2.getDrawingY(),
				line2.getStartX(),
				line2.getStartY(),
				line2.getEndX(),
				line2.getEndY(),
				line2.getRealScaleX(),
				line2.getRealScaleY(),
				line2.getRealSin(),
				line2.getRealCos(),
				
				circle.getDrawingX(),
				circle.getDrawingY(),
				circle.getWidth(),
				circle.getHeight(),
				circle.getRealScaleX(),
				circle.getRealScaleY(),
				circle.getRealSin(),
				circle.getRealCos()
			);
			
			EACH(intersectionPoints, (intersectionPoint) => {
				
				circles.push(SkyEngine.Circle({
					x : intersectionPoint.x,
					y : intersectionPoint.y,
					width : 10,
					height : 10,
					color : 'yellow'
				}).appendTo(SkyEngine.Screen));
			});
		});
		
		line2.moveRight(100);
		
		let delay = DELAY(1, () => {
			line2.stopRight();
			line2.moveDown(100);
			
			delay = DELAY(1, () => {
				
				line2.stopDown();
				line2.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = DELAY(2, () => {
						
						line2.stopLeft();
						line2.moveUp(100);
						
						delay = DELAY(2, () => {
							
							line2.stopUp();
							line2.moveRight(100);
							
							delay = DELAY(2, () => {
								
								line2.stopRight();
								line2.moveDown(100);
								
								delay = DELAY(2, () => {
									
									line2.stopDown();
									line2.moveLeft(100);
									
									repeat();
								});
							});
						});
					});
				});
			});
		});
		
		inner.on('close', () => {
			line.remove();
			line2.remove();
			
			EACH(circles, (circle) => {
				circle.remove();
			});
		});
	}
});
