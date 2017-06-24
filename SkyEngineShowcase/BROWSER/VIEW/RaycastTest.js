SkyEngineShowcase.RaycastTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let light;
		
		let genAngle = (point) => {
			
			let xs = point.x - torch.getX();
			xs = xs * xs;
			
			let ys = point.y - torch.getY();
			ys = ys * ys;
			
			point.angle = Math.acos((point.x - torch.getX()) / Math.sqrt(xs + ys));
			
			if (point.y > torch.getY()) {
			    point.angle = Math.PI + Math.PI - point.angle;
			}
		};
		
		let genLight = () => {
			
			let points = [{
				x : -SkyEngine.Screen.getWidth() / 2,
				y : -SkyEngine.Screen.getHeight() / 2
			}, {
				x : SkyEngine.Screen.getWidth() / 2,
				y : -SkyEngine.Screen.getHeight() / 2
			}, {
				x : SkyEngine.Screen.getWidth() / 2,
				y : SkyEngine.Screen.getHeight() / 2
			}, {
				x : -SkyEngine.Screen.getWidth() / 2,
				y : SkyEngine.Screen.getHeight() / 2
			}];
			
			if (light !== undefined) {
				light.remove();
			}
			
			balls.forEach((ball) => {
				ball.getCollider().findRaycastPoints(torch.getX(), torch.getY()).forEach((point) => {
					point.target = ball;
					points.push(point);
				});
			});
			
			boxes.forEach((box) => {
				box.getCollider().findRaycastPoints(torch.getX(), torch.getY()).forEach((point) => {
					point.target = box;
					points.push(point);
				});
			});
			
			let foundPoints = [];
			
			points.forEach((point) => {
				
				if (point.x === torch.getX()) {
					point.x = (point.y < 0 ? -999999 : 999999 - torch.getY()) / (point.y - torch.getY()) * (point.x - torch.getX()) + torch.getX();
					point.y = point.y < 0 ? -999999 : 999999;
				} else {
					point.y = (point.y - torch.getY()) / (point.x - torch.getX()) * (point.x < 0 ? -999999 : 999999 - torch.getX()) + torch.getY();
					point.x = point.x < 0 ? -999999 : 999999;
				}
				
				let minDistance, foundPoint;
				
				EACH(SkyEngine.Line.findRectIntersectionPoints(
					0, 0,
					torch.getX(), torch.getY(),
					point.x, point.y,
					1, 1,
					0, 1,
					
					0, 0,
					SkyEngine.Screen.getWidth(), SkyEngine.Screen.getHeight(),
					1, 1,
					0, 1
				), (point) => {
					
					let xs = point.x - torch.getX();
					let ys = point.y - torch.getY();
					
					minDistance = xs * xs + ys * ys;
					foundPoint = point;
				});
				
				balls.forEach((ball) => {
					
					if (point.target !== ball) {
						
						let collider = ball.getCollider();
						
						EACH(SkyEngine.Line.findCircleIntersectionPoints(
							0, 0,
							torch.getX(), torch.getY(),
							point.x, point.y,
							1, 1,
							0, 1,
							
							collider.getDrawingX(), collider.getDrawingY(),
							collider.getWidth(), collider.getHeight(),
							collider.getRealScaleX(), collider.getRealScaleY(),
							collider.getRealSin(), collider.getRealCos()
						), (point) => {
							
							let xs = point.x - torch.getX();
							let ys = point.y - torch.getY();
							let distance = xs * xs + ys * ys;
							
							if (distance < minDistance) {
								minDistance = distance;
								foundPoint = point;
							}
						});
					}
				});
				
				boxes.forEach((box) => {
					
					if (point.target !== box) {
						
						let collider = box.getCollider();
						
						EACH(SkyEngine.Line.findRectIntersectionPoints(
							0, 0,
							torch.getX(), torch.getY(),
							point.x, point.y,
							1, 1,
							0, 1,
							
							collider.getDrawingX(), collider.getDrawingY(),
							collider.getWidth(), collider.getHeight(),
							collider.getRealScaleX(), collider.getRealScaleY(),
							collider.getRealSin(), collider.getRealCos()
						), (point) => {
							
							let xs = point.x - torch.getX();
							let ys = point.y - torch.getY();
							let distance = xs * xs + ys * ys;
							
							if (distance < minDistance) {
								minDistance = distance;
								foundPoint = point;
							}
						});
					}
				});
				
				if (foundPoint !== undefined) {
					foundPoints.push(foundPoint);
				}
			});
			
			foundPoints.sort((pointA, pointB) => {
				
				if (pointA.angle === undefined) {
					genAngle(pointA);
				}
				
				if (pointB.angle === undefined) {
					genAngle(pointB);
				}
				
				return pointA.angle - pointB.angle;
			});
			
			light = SkyEngine.Polygon({
				points : foundPoints,
				color : '#FFCC00',
				z : -1
			}).appendTo(SkyEngine.Screen);
		};
		
		let torch = SkyEngine.Sprite({
			src : SkyEngineShowcase.R('torch.png'),
			spriteWidth : 32,
			fps : 10,
			on : {
				move : () => {
					genLight();
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		let balls = [];
		
		REPEAT(50, () => {
			
			balls.push(SkyEngine.Image({
				src : SkyEngineShowcase.R('ball.png'),
				x : RANDOM({
					min : -600,
					max : 600
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : 0.2,
				collider : SkyEngine.Circle({
					width : 99,
					height : 96
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		let boxes = [];
		
		REPEAT(50, () => {
			
			boxes.push(SkyEngine.Image({
				src : SkyEngineShowcase.R('box.png'),
				x : RANDOM({
					min : -600,
					max : 600
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : 0.05,
				collider : SkyEngine.Rect({
					width : 512,
					height : 512
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		genLight();
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				torch.setState('shoot');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				torch.moveUp(200);
			} else if (e.getKey() === 'ArrowDown') {
				torch.moveDown(200);
			} else if (e.getKey() === 'ArrowLeft') {
				torch.moveLeft(200);
			} else if (e.getKey() === 'ArrowRight') {
				torch.moveRight(200);
			}
		});
		
		let keyupEvent = EVENT('keyup', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				torch.setToState('idle');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				torch.stopUp();
			} else if (e.getKey() === 'ArrowDown') {
				torch.stopDown();
			} else if (e.getKey() === 'ArrowLeft') {
				torch.stopLeft();
			} else if (e.getKey() === 'ArrowRight') {
				torch.stopRight();
			}
		});
		
		inner.on('close', () => {
			torch.remove();
			EACH(balls, (ball) => {
				ball.remove();
			});
			EACH(boxes, (box) => {
				box.remove();
			});
			
			if (light !== undefined) {
				light.remove();
			}
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
