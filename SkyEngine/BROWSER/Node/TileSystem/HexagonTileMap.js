/*
 * 헥사곤 타일맵 노드
 */
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
				//OPTIONAL: params.tile
				//OPTIONAL: params.key
				
				let row = params.row;
				let col = params.col;
				
				let tile = inner.createTile(params);
				
				if (tile !== undefined) {
					
					tile.setPosition({
						x : col * self.getTileWidth() + (row % 2) * self.getTileWidth() / 2,
						y : row * (self.getTileHeight() - overlapHeight)
					});
					
					// 충돌체 추가
					if (tile.checkIsInstanceOf(SkyEngine.CollisionTile) === true) {
						tile.addCollider(SkyEngine.Polygon({
							points : [{
								x : 0,
								y : -self.getTileHeight() / 2
							}, {
								x : self.getTileWidth() / 2,
								y : -self.getTileHeight() / 4
							}, {
								x : self.getTileWidth() / 2,
								y : self.getTileHeight() / 4
							}, {
								x : 0,
								y : self.getTileHeight() / 2
							}, {
								x : -self.getTileWidth() / 2,
								y : self.getTileHeight() / 4
							}, {
								x : -self.getTileWidth() / 2,
								y : -self.getTileHeight() / 4
							}]
						}));
					}
				}
			};
		});
		
		let findPath;
		OVERRIDE(self.findPath, (origin) => {
			
			findPath = self.findPath = (params) => {
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
				
				let register = (parent, row, col) => {
					
					if (self.getTile({
						row : row,
						col : col
					}) !== undefined && self.checkCollisionTile({
						row : row,
						col : col
					}) !== true) {
						
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
				
				register({
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
					
					if (point.row % 2 === 0) {
						register(point, point.row - 1, point.col - 1);
						register(point, point.row - 1, point.col);
						register(point, point.row, point.col + 1);
						register(point, point.row + 1, point.col);
						register(point, point.row + 1, point.col - 1);
						register(point, point.row, point.col - 1);
					} else {
						register(point, point.row - 1, point.col);
						register(point, point.row - 1, point.col + 1);
						register(point, point.row, point.col + 1);
						register(point, point.row + 1, point.col + 1);
						register(point, point.row + 1, point.col);
						register(point, point.row, point.col - 1);
					}
				}
			};
		});
	}
});
