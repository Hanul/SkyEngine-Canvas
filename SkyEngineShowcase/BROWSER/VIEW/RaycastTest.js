SkyEngineShowcase.RaycastTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let genLight = () => {
			
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
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
