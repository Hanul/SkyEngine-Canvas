SkyEngine.CollisionTile = CLASS({
	
	preset : () => {
		return SkyEngine.Tile;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		
		let width = params.width;
		let height = params.height;
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
		
		self.addCollider(SkyEngine.Rect({
			width : width,
			height : height
		}));
	}
});
