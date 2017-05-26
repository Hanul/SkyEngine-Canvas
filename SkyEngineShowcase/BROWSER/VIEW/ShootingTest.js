SkyEngineShowcase.ShootingTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let hero = SkyEngine.StateSet({
			x : -500,
			scale : 0.5,
			stateNodes : {
				idle : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(20, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/idle/survivor-idle_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 10
				}),
				shoot : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(3, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/shoot/survivor-shoot_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 10,
					on : {
						framechange : (sprite) => {
							if (sprite.getBeforeFrame() === 0) {
								
								SkyEngine.Sprite({
									src : SkyEngineShowcase.R('bullet.png'),
									x : hero.getX() + 70,
									y : hero.getY() + 24,
									spriteWidth : 16,
									fps : 10,
									speedX : 2000,
									on : {
										offscreen : (bullet) => {
											bullet.remove();
										}
									}
								}).appendTo(SkyEngine.Screen);
							}
						}
					}
				})
			},
			baseState : 'idle'
		}).appendTo(SkyEngine.Screen);
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				hero.setState('shoot');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				hero.moveUp(200);
			} else if (e.getKey() === 'ArrowDown') {
				hero.moveDown(200);
			} else if (e.getKey() === 'ArrowLeft') {
				hero.moveLeft(200);
			} else if (e.getKey() === 'ArrowRight') {
				hero.moveRight(200);
			}
		});
		
		let keyupEvent = EVENT('keyup', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				hero.setToState('idle');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				hero.stopUp();
			} else if (e.getKey() === 'ArrowDown') {
				hero.stopDown();
			} else if (e.getKey() === 'ArrowLeft') {
				hero.stopLeft();
			} else if (e.getKey() === 'ArrowRight') {
				hero.stopRight();
			}
		});
		
		inner.on('close', () => {
			hero.remove();
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
