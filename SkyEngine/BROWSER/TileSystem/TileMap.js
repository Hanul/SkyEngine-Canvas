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
		let collisionMap = params.collisionMap;
		
		if (collisionMap === undefined) {
			collisionMap = [];
		}
		
		let getTileWidth = self.getTileWidth = () => {
			return tileWidth;
		};
		
		let getTileHeight = self.getTileHeight = () => {
			return tileHeight;
		};
		
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
			
			let x = col * tileWidth;
			let y = row * tileHeight;
			
			if (isCollider === true) {
				if (collisionMap[row] === undefined) {
					collisionMap[row] = [];
				}
				collisionMap[row][col] = 1;
			}
			
			let tileNode;
			
			if (collisionMap[row] !== undefined && collisionMap[row][col] === 1) {
				tileNode = SkyEngine.CollisionTile({
					x : x,
					y : y,
					c : tile,
					collider : SkyEngine.Rect({
						width : tileWidth,
						height : tileHeight
					})
				});
			}
			
			else {
				tileNode = SkyEngine.Tile({
					x : x,
					y : y,
					c : tile
				});
			}
			
			self.append(tileNode);
		};
		
		let getCollisionMap = self.getCollisionMap = () => {
			return collisionMap;
		};
		
		let clone;
		OVERRIDE(self.clone, (origin) => {
			
			clone = self.clone = (appendParams) => {
				//OPTIONAL: appendParams
				
				let newParams = {
					tileWidth : tileWidth,
					tileHeight : tileHeight,
					collisionMap : collisionMap
				};
				
				if (appendParams !== undefined) {
					EXTEND({
						origin : newParams,
						extend : appendParams
					});
				}
				
				return origin(newParams);
			};
		});
		
		let findPath = self.findPath = (params) => {
			//REQUIRED: params
			//REQUIRED: params.startRow
			//REQUIRED: params.startCol
			//REQUIRED: params.endRow
			//REQUIRED: params.endCol
			
			let startRow = params.startRow;
			let startCol = params.startCol;
			let endRow = params.endRow;
			let endCol = params.endCol;
			
			let costMap = [];
			
			let queue = [];
			
			let regist = (parent, row, col) => {
				
				if (collisionMap[row] !== undefined && collisionMap[row][col] === 0) {
					
					if (costMap[row] === undefined) {
						costMap[row] = [];
					}
					
					let cost = parent.cost + 1;
					
					if (costMap[row][col] === undefined || costMap[row][col] > cost) {
						
						costMap[row][col] = cost;
						
						queue.push({
							parent : parent,
							row : row,
							col : col,
							cost : cost
						});
					}
				}
			};
			
			regist({
				cost : -1
			}, startRow, startCol);
			
			while (queue.length > 0) {
				let point = queue.shift();
				
				// 찾았다.
				if (point.row === endRow && point.col === endCol) {
					
					let path = [];
					
					let nowPoint = point;
					
					while (nowPoint.cost >= 0) {
						
						path.unshift({
							row : nowPoint.row,
							col : nowPoint.col
						});
						
						nowPoint = nowPoint.parent;
					}
					
					return path;
				}
				
				regist(point, point.row - 1, point.col);
				regist(point, point.row, point.col + 1);
				regist(point, point.row + 1, point.col);
				regist(point, point.row, point.col - 1);
			}
		};
	},
	
	afterInit : (inner, self, params) => {
		
		let tileMap = params.tileMap;
		let tileKeySet = params.tileKeySet;
		let tileKeyMap = params.tileKeyMap;
		
		if (tileMap !== undefined) {
			
			EACH(tileMap, (tiles, i) => {
				EACH(tiles, (tile, j) => {
					if (tile !== undefined) {
						self.addTile({
							row : i,
							col : j,
							tile : tile
						});
					}
				});
			});
			
			tileMap = undefined;
		}
		
		if (tileKeyMap !== undefined) {
			
			EACH(tileKeyMap, (tileKeys, i) => {
				EACH(tileKeys, (tileKey, j) => {
					
					let tile = tileKeySet[tileKey];
					
					if (tile !== undefined) {
						
						self.addTile({
							row : i,
							col : j,
							tile : tile.clone()
						});
					}
				});
			});
			
			tileKeyMap = undefined;
		}
	}
});
