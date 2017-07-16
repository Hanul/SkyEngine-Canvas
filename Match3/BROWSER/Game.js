Match3.Game = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rootNode = SkyEngine.Node({
			c : [SkyEngine.Image({
				src : Match3.R('bg.jpg')
			}),
			
			// top
			SkyEngine.Dom({
				y : -440,
				style : {
					fontSize : 80,
					color : '#000'
				},
				c : 'Match 3'
			}),
			
			// bottom
			SkyEngine.Dom({
				y : 440,
				c : DIV({
					style : {
						position : 'absolute',
						left : -300,
						top : -25,
						width : 600,
						height : 50,
						backgroundColor : '#000',
						borderRadius : 30
					}
				})
			})]
		}).appendTo(SkyEngine.Screen);
		
		REPEAT(7, (i) => {
			REPEAT(7, (j) => {
				rootNode.append(SkyEngine.Rect({
					x : j * 100 - 300,
					y : i * 100 - 300,
					width : 100,
					height : 100,
					color : (i + j) % 2 === 0 ? '#000' : '#333'
				}));
			});
		});
		
		let resizeEvent = EVENT('resize', RAR(() => {
			rootNode.setScale(WIN_HEIGHT() / 1050);
		}));
		
		let tileMap;
		rootNode.append(tileMap = SkyEngine.TileMap({
			x : -300,
			y : -300,
			tileKeySet : {
				1 : SkyEngine.Image({
					src : Match3.R('snake.png'),
					scale : 0.3
				}),
				2 : SkyEngine.Image({
					src : Match3.R('giraffe.png'),
					scale : 0.3
				}),
				3 : SkyEngine.Image({
					src : Match3.R('hippo.png'),
					scale : 0.3
				}),
				4 : SkyEngine.Image({
					src : Match3.R('monkey.png'),
					scale : 0.3
				}),
				5 : SkyEngine.Image({
					src : Match3.R('panda.png'),
					scale : 0.3
				}),
				6 : SkyEngine.Image({
					src : Match3.R('parrot.png'),
					scale : 0.3
				}),
				7 : SkyEngine.Image({
					src : Match3.R('penguin.png'),
					scale : 0.3
				}),
				8 : SkyEngine.Image({
					src : Match3.R('pig.png'),
					scale : 0.3
				}),
				9 : SkyEngine.Image({
					src : Match3.R('rabbit.png'),
					scale : 0.3
				})
			},
			tileWidth : 100,
			tileHeight : 100,
			touchArea : SkyEngine.Rect({
				x : 300,
				y : 300,
				width : 700,
				height : 1050
			})
		}));
		
		let checkImpossible = () => {
			
			return REPEAT(7, (i) => {
				return REPEAT(7, (j) => {
					
					let nowTileKey = tileMap.getTileKey({
						row : i,
						col : j
					});
					
					if (nowTileKey !== undefined && (
						
						(tileMap.getTileKey({
							row : i - 1,
							col : j
						}) === nowTileKey && (tileMap.getTileKey({
							row : i + 1,
							col : j - 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i + 1,
							col : j + 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i + 2,
							col : j
						}) === nowTileKey)) ||
						
						(tileMap.getTileKey({
							row : i + 1,
							col : j
						}) === nowTileKey && (tileMap.getTileKey({
							row : i - 1,
							col : j - 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i - 1,
							col : j + 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i - 2,
							col : j
						}) === nowTileKey)) ||
						
						(tileMap.getTileKey({
							row : i,
							col : j - 1
						}) === nowTileKey && (tileMap.getTileKey({
							row : i - 1,
							col : j + 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i + 1,
							col : j + 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i,
							col : j + 2
						}) === nowTileKey)) ||
						
						(tileMap.getTileKey({
							row : i,
							col : j + 1
						}) === nowTileKey && (tileMap.getTileKey({
							row : i - 1,
							col : j - 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i + 1,
							col : j - 1
						}) === nowTileKey || tileMap.getTileKey({
							row : i,
							col : j - 2
						}) === nowTileKey))
						
					)) {
						return false;
					}
				});
			});
		};
		
		let checkMatch3 = () => {
			
			let toRemoveTilePositions = [];
			
			REPEAT(7, (i) => {
				REPEAT(7, (j) => {
					
					let nowTileKey = tileMap.getTileKey({
						row : i,
						col : j
					});
					
					if (tileMap.getTileKey({
						row : i,
						col : j + 1
					}) === nowTileKey && tileMap.getTileKey({
						row : i,
						col : j + 2
					}) === nowTileKey) {
						toRemoveTilePositions.push({
							row : i,
							col : j
						});
						toRemoveTilePositions.push({
							row : i,
							col : j + 1
						});
						toRemoveTilePositions.push({
							row : i,
							col : j + 2
						});
					}
					
					if (tileMap.getTileKey({
						row : i + 1,
						col : j
					}) === nowTileKey && tileMap.getTileKey({
						row : i + 2,
						col : j
					}) === nowTileKey) {
						toRemoveTilePositions.push({
							row : i,
							col : j
						});
						toRemoveTilePositions.push({
							row : i + 1,
							col : j
						});
						toRemoveTilePositions.push({
							row : i + 2,
							col : j
						});
					}
				});
			});
			
			EACH(toRemoveTilePositions, (toRemoveTilePosition) => {
				tileMap.removeTile({
					row : toRemoveTilePosition.row,
					col : toRemoveTilePosition.col
				});
			});
		};
		
		let makeTiles = () => {
			
			tileMap.empty();
			
			REPEAT(7, (i) => {
				REPEAT(7, (j) => {
					
					let addTile = () => {
						
						let tileKey = RANDOM({
							min : 1,
							max : 9
						});
						
						if ((tileMap.getTileKey({
							row : i - 2,
							col : j
						}) === tileKey && tileMap.getTileKey({
							row : i - 1,
							col : j
						}) === tileKey) || (tileMap.getTileKey({
							row : i,
							col : j - 2
						}) === tileKey && tileMap.getTileKey({
							row : i,
							col : j - 1
						}) === tileKey)) {
							addTile();
						} else {
							
							tileMap.addTile({
								row : i,
								col : j,
								key : tileKey
							});
						}
					};
					addTile();
				});
			});
			
			// 불가능하면 다시 타일 생성
			if (checkImpossible() === true) {
				makeTiles();
			}
		};
		makeTiles();
		
		let selectedTile;
		let selectedTileRow;
		let selectedTileCol;
		
		tileMap.on('touchstart', (e) => {
			
			selectedTileRow = Math.floor((e.getY() / tileMap.getRealScaleY() + 350) / 100);
			selectedTileCol = Math.floor((e.getX() / tileMap.getRealScaleX() + 350) / 100);
			
			if (selectedTile !== undefined) {
				selectedTile.setAlpha(1);
			}
			
			selectedTile = tileMap.getTile({
				row : selectedTileRow,
				col : selectedTileCol
			});
			
			if (selectedTile !== undefined) {
				selectedTile.setAlpha(0.5);
			}
			
			e.stop();
		});
		
		tileMap.on('touchend', (e) => {
			
			if (selectedTile !== undefined) {
				
				let row = Math.floor((e.getY() / tileMap.getRealScaleY() + 350) / 100);
				let col = Math.floor((e.getX() / tileMap.getRealScaleX() + 350) / 100);
				
				selectedTile.setAlpha(1);
				
				if (row < selectedTileRow && selectedTileRow > 0) {
					
					tileMap.moveTile({
						fromRow : selectedTileRow,
						fromCol : selectedTileCol,
						toRow : selectedTileRow - 1,
						toCol : selectedTileCol,
						speed : 1000,
						accel : 1000
					});
					
				} else if (row > selectedTileRow && selectedTileRow < 6) {
					
					tileMap.moveTile({
						fromRow : selectedTileRow,
						fromCol : selectedTileCol,
						toRow : selectedTileRow + 1,
						toCol : selectedTileCol,
						speed : 1000,
						accel : 1000
					});
					
				} else if (col < selectedTileCol && selectedTileCol > 0) {
					
					tileMap.moveTile({
						fromRow : selectedTileRow,
						fromCol : selectedTileCol,
						toRow : selectedTileRow,
						toCol : selectedTileCol - 1,
						speed : 1000,
						accel : 1000
					});
					
				} else if (col > selectedTileCol && selectedTileCol < 6) {
					
					tileMap.moveTile({
						fromRow : selectedTileRow,
						fromCol : selectedTileCol,
						toRow : selectedTileRow,
						toCol : selectedTileCol + 1,
						speed : 1000,
						accel : 1000
					});
				}
				
				selectedTile = undefined;
				
				checkMatch3();
				
				// 불가능하면 다시 타일 생성
				if (checkImpossible() === true) {
					makeTiles();
				}
			}
		});
		
		inner.on('close', () => {
			rootNode.remove();
			
			resizeEvent.remove();
		});
	}
});
