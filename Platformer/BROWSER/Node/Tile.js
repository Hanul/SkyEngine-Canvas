Platformer.Tile = CLASS({
	
	preset : () => {
		return SkyEngine.Image;
	},
	
	init : (inner, self) => {
		
		self.addCollider(SkyEngine.Rect({
			width : 128,
			height : 128
		}));
	}
});
