Platformer.Tile = CLASS((cls) => {
	
	const WIDTH = 128;
	const HEIGHT = 128;
	
	cls.WIDTH = WIDTH;
	cls.HEIGHT = HEIGHT;
	
	return {
		
		preset : () => {
			return SkyEngine.Image;
		},
		
		init : (inner, self) => {
			
			self.addCollider(SkyEngine.Rect({
				width : WIDTH,
				height : HEIGHT
			}));
		}
	};
});
