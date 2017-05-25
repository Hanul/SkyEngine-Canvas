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
		let collisionMap = params.collisionMap;
		
		EACH(tileMap, (tiles, i) => {
			EACH(tiles, (tile, j) => {
				if (tile !== undefined) {
					self.append((collisionMap[i][j] === 1 ? SkyEngine.CollisionTile : SkyEngine.Tile)({
						x : (j - tiles.length / 2) * tileWidth,
						y : (i - tileMap.length / 2) * tileHeight,
						width : tileWidth,
						height : tileHeight,
						c : tile
					}));
				}
			});
		});
	}
});
