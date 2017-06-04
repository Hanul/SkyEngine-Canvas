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
				
				let row = params.row;
				let col = params.col;
				let tile = params.tile;
				
				tile.setX(col * self.getTileWidth() + (row % 2) * self.getTileWidth() / 2);
				tile.setY(row * (self.getTileHeight() - overlapHeight));
				
				self.append(tile);
			};
		});
	}
});
