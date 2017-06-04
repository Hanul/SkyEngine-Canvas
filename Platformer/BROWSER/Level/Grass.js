Platformer.Grass = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rootNode = SkyEngine.Node({
			scale : 0.5
		}).appendTo(SkyEngine.Screen);
		
		// 중력
		let gravity = 3000;
		
		// 배경 이미지
		let bg = SkyEngine.Background({
			src : Platformer.R('Backgrounds/blue_land.png'),
			isNotToRepeatY : true
		}).appendTo(rootNode);
		
		// 플레이어 캐릭터
		let player = SkyEngine.StateSet({
			centerY : 92,
			accelY : gravity,
			collider : SkyEngine.Rect({
				width : 80,
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
		}).appendTo(rootNode);
		
		SkyEngine.Screen.followX(player);
		
		let GrassTile = CLASS({
			preset : () => {
				return SkyEngine.Image;
			}
		});
		
		// 땅
		let lands = SkyEngine.TileMap({
			x : -100,
			y : 300,
			tileWidth : 128,
			tileHeight : 128,
			tileKeySet : {
				1 : GrassTile({
					src : Platformer.R('Ground/Grass/grass.png'),
					collider : SkyEngine.Rect({
						width : 128,
						height : 128
					})
				})
			},
			tileKeyMap : [[1, 1, 0, 1, 1, 1, 1, 1, 1]]
		}).appendTo(rootNode);
		
		lands.addTile({
			row : -1,
			col : -2,
			tile : GrassTile({
				src : Platformer.R('Ground/Grass/grass.png'),
				collider : SkyEngine.Rect({
					width : 128,
					height : 128
				})
			})
		});
		
		// 타일과 만났다.
		player.onMeet(GrassTile, (tile) => {
			
			if (player.getBeforeY() <= lands.getY() + tile.getY() - 128 / 2) {
				player.setY(lands.getY() + tile.getY() - 128 / 2);
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
		let keydownEvent = EVENT('keydown', (e) => {
			
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
			
			if (e.getKey() === ' ' && player.getState() !== 'jump' && player.getSpeedY() === 0) {
				player.setSpeedY(-1200);
				player.setAccelY(gravity);
				
				player.setState('jump');
			}
		});
		
		// 키를 뗐다.
		let keyupEvent = EVENT('keyup', (e) => {
			
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
			rootNode.remove();
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
