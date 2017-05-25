Platformer.Grass = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		SkyEngine.Screen.setScale(0.5);
		
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
		let lands = SkyEngine.TileMap({
			y : 300,
			tileWidth : 128,
			tileHeight : 128,
			tileMap : [[SkyEngine.Image({
				src : Platformer.R('Ground/Grass/grass.png')
			}), SkyEngine.Image({
				src : Platformer.R('Ground/Grass/grass.png')
			}), undefined, SkyEngine.Image({
				src : Platformer.R('Ground/Grass/grass.png')
			})]],
			collisionMap : [[1, 1, 0, 1]]
		}).appendTo(SkyEngine.Screen);
		
		// 타일과 만났다.
		player.onMeet(SkyEngine.CollisionTile, (tile) => {
			
			if (player.getBeforeY() <= lands.getY() + tile.getY() - tile.getHeight() / 2) {
				player.setY(lands.getY() + tile.getY() - tile.getHeight() / 2);
				player.setAccelY(0);
				player.stopDown();
				
				if (player.getState() === 'jump') {
					// 이동중이고, 가속도가 없어야 합니다. (가속도가 있다는 것은 멈추는 중인 상황임)
					if (player.getSpeedX() !== 0 && player.getAccelX() === 0) {
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
				player.stopLeft(2500);
				
				if (player.getState() !== 'jump') {
					player.setState('idle');
				}
			}
			
			if (player.getSpeedX() > 0 && e.getKey() === 'ArrowRight') {
				player.stopRight(2500);
				
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
