/*
 * 타일 맵
 */
SkyEngine.TileMap = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.tileWidth
		//REQUIRED: params.tileHeight
		//REQUIRED: params.tileMap
		//REQUIRED: params.collisionMap
		
		let tileWidth = params.tileWidth;
		let tileHeight = params.tileHeight;
		let tileMap = params.tileMap;
		
		EACH(tileMap, (tiles, i) => {
			EACH(tiles, (tile, j) => {
				if (tile !== undefined) {
					tile.setX((j - tiles.length / 2) * tileWidth);
					tile.setY((i - tileMap.length / 2) * tileHeight);
					self.append(tile);
				}
			});
		});
	}
});
