Platformer.Grass = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		// 중력
		let gravity = 3000;
		
		// 배경 이미지
		let bg = SkyEngine.Image({
			src : Platformer.R('Backgrounds/blue_land.png')
		}).appendTo(SkyEngine.Screen);
		
		// 플레이어 캐릭터
		let player = SkyEngine.StateSet({
			centerY : 92,
			accelY : gravity,
			collider : SkyEngine.Rect({
				width : 134,
				height : 184
			}),
			stateNodes : {
				idle : SkyEngine.Sprite({
					srcs : [
						Platformer.R('Players/Green/alienGreen_stand.png')
					]
				}),
				walk : SkyEngine.Sprite({
					srcs : [
						Platformer.R('Players/Green/alienGreen_walk1.png'),
						Platformer.R('Players/Green/alienGreen_walk2.png')
					],
					fps : 10,
					isHiding : true
				}),
				jump : SkyEngine.Sprite({
					srcs : [
						Platformer.R('Players/Green/alienGreen_jump.png')
					],
					isHiding : true
				})
			},
			baseState : 'idle'
		}).appendTo(SkyEngine.Screen);
		
		// 땅
		let lands = SkyEngine.Node({
			c : [Platformer.Tile({
				src : Platformer.R('Ground/Grass/grass.png'),
				x : -64,
				y : 300
			}), Platformer.Tile({
				src : Platformer.R('Ground/Grass/grass.png'),
				x : 64,
				y : 300
			}), Platformer.Tile({
				src : Platformer.R('Ground/Grass/grass.png'),
				x : 400,
				y : 300
			})]
		}).appendTo(SkyEngine.Screen);
		
		// 타일과 만났다.
		player.onMeet(Platformer.Tile, (tile) => {
			
			if (player.getBeforeY() <= tile.getY() - 64) {
				player.setY(tile.getY() - 64);
				player.setAccelY(0);
				player.stopDown();
				
				if (player.getState() === 'jump') {
					if (player.getSpeedX() !== 0) {
						player.setState('walk');
					} else {
						player.setState('idle');
					}
				}
			}
		});
		
		// 땅과 떨어졌다.
		player.onPart(lands, () => {
			player.setAccelY(gravity);
		});
		
		// 키를 눌렀다.
		EVENT('keydown', (e) => {
			
			if (e.getKey() === 'ArrowLeft') {
				player.moveLeft(500);
				player.setScaleX(-1);
				
				if (player.getState() !== 'jump') {
					player.setState('walk');
				}
			}
			
			if (e.getKey() === 'ArrowRight') {
				player.moveRight(500);
				player.setScaleX(1);
				
				if (player.getState() !== 'jump') {
					player.setState('walk');
				}
			}
			
			if (e.getKey() === ' ' && player.getState() !== 'jump') {
				player.setSpeedY(-1200);
				player.setAccelY(gravity);
				
				player.setState('jump');
			}
		});
		
		// 키를 뗐다.
		EVENT('keyup', (e) => {
			
			if (player.getSpeedX() < 0 && e.getKey() === 'ArrowLeft') {
				player.stopLeft();
				
				if (player.getState() !== 'jump') {
					player.setState('idle');
				}
			}
			
			if (player.getSpeedX() > 0 && e.getKey() === 'ArrowRight') {
				player.stopRight();
				
				if (player.getState() !== 'jump') {
					player.setState('idle');
				}
			}
		});
		
		inner.on('close', () => {
			bg.remove();
			player.remove();
		});
	}
});
