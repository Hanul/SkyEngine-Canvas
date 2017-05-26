SkyEngineShowcase.RaycastTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let Enemy = CLASS({
			preset : () => {
				return SkyEngine.Sprite;
			}
		});
		
		let enemies = [];
		REPEAT(100, () => {
			
			enemies.push(Enemy({
				x : 500 + RANDOM({
					min : -300,
					max : 300
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : -0.5,
				srcs : RUN(() => {
					
					let srcs = [];
					
					REPEAT(20, (i) => {
						srcs.push(SkyEngineShowcase.R('knife/idle/survivor-idle_knife_' + i + '.png'));
					});
					
					return srcs;
				}),
				fps : 24,
				collider : SkyEngine.Rect({
					x : -30,
					width : 70,
					height : 70
				})
			}).appendTo(SkyEngine.Screen));
		});
		
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
					fps : 24
				}),
				shoot : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(3, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/shoot/survivor-shoot_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 24,
					on : {
						framechange : (sprite) => {
							if (sprite.getBeforeFrame() === 0) {
								
								let targetEnemy;
								
								let bulletCollider;
								let bullet = SkyEngine.Line({
									startX : hero.getX() + 65,
									startY : hero.getY() + 24,
									endX : SkyEngine.Screen.getWidth(),
									endY : hero.getY() + 24,
									border : '1px solid #fff',
									collider : bulletCollider = SkyEngine.Line({
										startX : hero.getX() + 65,
										startY : hero.getY() + 24,
										endX : SkyEngine.Screen.getWidth(),
										endY : hero.getY() + 24
									}),
									on : {
										nextstep : (bullet) => {
											bullet.remove();
											
											if (targetEnemy !== undefined) {
												
												REMOVE({
													array : enemies,
													value : targetEnemy
												});
												
												targetEnemy.remove();
											}
										} 
									}
								}).appendTo(SkyEngine.Screen);
								
								bullet.onMeet(Enemy, (enemy) => {
									if (targetEnemy === undefined || targetEnemy.getX() > enemy.getX()) {
										targetEnemy = enemy;
										bullet.setEndX(enemy.getX());
										bulletCollider.setEndX(enemy.getX());
									}
								});
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
			EACH(enemies, (enemy) => {
				enemy.remove();
			});
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
