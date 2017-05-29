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
		//OPTIONAL: params.tileMap
		//OPTIONAL: params.tileKeySet
		//OPTIONAL: params.tileKeyMap
		//OPTIONAL: params.collisionMap
		
		let tileWidth = params.tileWidth;
		let tileHeight = params.tileHeight;
		let tileMap = params.tileMap;
		let tileKeySet = params.tileKeySet;
		let tileKeyMap = params.tileKeyMap;
		let collisionMap = params.collisionMap;
		
		let addTile = self.addTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			//REQUIRED: params.tile
			//OPTIONAL: params.isCollider
			
			let row = params.row;
			let col = params.col;
			let tile = params.tile;
			let isCollider = params.isCollider;
			
			self.append((isCollider === true || (collisionMap !== undefined && collisionMap[row] !== undefined && collisionMap[row][col] === 1) ? SkyEngine.CollisionTile : SkyEngine.Tile)({
				x : col * tileWidth,
				y : row * tileHeight,
				width : tileWidth,
				height : tileHeight,
				c : tile
			}));
		};
		
		if (tileMap !== undefined) {
			
			EACH(tileMap, (tiles, i) => {
				EACH(tiles, (tile, j) => {
					if (tile !== undefined) {
						addTile({
							row : i,
							col : j,
							tile : tile
						});
					}
				});
			});
		}
		
		if (tileKeyMap !== undefined) {
			
			EACH(tileKeyMap, (tileKeys, i) => {
				EACH(tileKeys, (tileKey, j) => {
					addTile({
						row : i,
						col : j,
						tile : tileKeySet[timeKey].clone()
					});
				});
			});
		}
	}
});
