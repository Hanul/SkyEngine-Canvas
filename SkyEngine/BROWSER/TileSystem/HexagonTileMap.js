SkyEngine.HexagonTileMap = CLASS({
	
	preset : () => {
		return SkyEngine.TileMap;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.overlapHeight
		
		let overlapHeight = params.overlapHeight;
		
		let addTile;
		OVERRIDE(self.addTile, (origin) => {
			
			addTile = self.addTile = (params) => {
				//REQUIRED: params
				//REQUIRED: params.row
				//REQUIRED: params.col
				//REQUIRED: params.tile
				//OPTIONAL: params.isCollider
				
				let row = params.row;
				let col = params.col;
				
				let tileNode = origin(params);
				
				tileNode.setX(col * self.getTileWidth() + (row % 2) * self.getTileWidth() / 2);
				tileNode.setY(row * (self.getTileHeight() - overlapHeight));
			};
		});
	}
});
