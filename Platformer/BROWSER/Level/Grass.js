Platformer.Grass = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let gravity = 3000;
		
		SkyEngine.Screen.setScale(0.5);
		
		let bg = SkyEngine.Image({
			src : Platformer.R('Backgrounds/blue_land.png')
		}).appendTo(SkyEngine.Screen);
		
		let player = SkyEngine.Sprite({
			srcs : [
				Platformer.R('Players/Green/alienGreen_stand.png')
			],
			centerY : 92,
			fps : 10,
			accelY : gravity
		}).appendTo(SkyEngine.Screen);
		
		player.addCollider(SkyEngine.Rect({
			width : 134,
			height : 184
		}));
		
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
		
		let isPlayerOnGround = false;
		
		player.onMeet(Platformer.Tile, (tile) => {
			
			if (player.getBeforeY() <= tile.getY() - 64) {
				player.setY(tile.getY() - 64);
				player.setAccelY(0);
				player.stopDown();
				
				isPlayerOnGround = true;
			}
		});
		
		player.onPart(lands, () => {
			player.setAccelY(gravity);
			
			isPlayerOnGround = false;
		});
		
		EVENT('keydown', (e) => {
			if (e.getKey() === 'ArrowLeft') {
				player.moveLeft(500);
				player.setScaleX(-1);
			}
			if (e.getKey() === 'ArrowRight') {
				player.moveRight(500);
				player.setScaleX(1);
			}
			if (e.getKey() === ' ' && isPlayerOnGround === true) {
				player.setSpeedY(-1200);
				player.setAccelY(gravity);
			}
		});
		
		EVENT('keyup', (e) => {
			if (player.getSpeedX() < 0 && e.getKey() === 'ArrowLeft') {
				player.stopLeft();
			}
			if (player.getSpeedX() > 0 && e.getKey() === 'ArrowRight') {
				player.stopRight();
			}
		});
		
		inner.on('close', () => {
			
			bg.remove();
			
			player.remove();
		});
	}
});
