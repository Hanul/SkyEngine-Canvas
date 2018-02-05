작성중

# 타일 시스템

타일 맵 노드는 다음과 같이 3종류가 있습니다.
* [`SkyEngine.TileMap`](#타일-맵-노드)
* [`SkyEngine.IsomatricTileMap`](#isomatric-타일-맵-노드)
* [`SkyEngine.HexagonTileMap`](#hexagon-타일-맵-노드)

타일 노드는 다음과 같이 2종류가 있습니다.
* [`SkyEngine.Tile`](#타일-노드)
* [`SkyEngine.CollisionTile`](#충돌-타일-노드)

## 타일 맵 노드
`SkyEngine.TileMap`

일반적인 사각형 타일 맵을 생성합니다.

![타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/tilemap.png)

```javascript
let tileMap = SkyEngine.TileMap({
	centerX : 32 * 3.5,
	centerY : 32 * 3.5,
	tileWidth : 32,
	tileHeight : 32,
	tileSet : {
		grass : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/grass.png')
				})
			});
		},
		dirt : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/dirt.png')
				})
			});
		},
		stone : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/stone.png')
				})
			});
		},
	},
	tileKeyMap : [
		['grass', 'dirt',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'dirt',  'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'dirt',  'dirt' ],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'grass', 'grass', 'grass'],
		['grass', 'dirt',  'dirt',  'dirt',  'grass', 'stone', 'stone', 'stone'],
		['grass', 'grass', 'grass', 'grass', 'grass', 'stone', 'stone', 'stone']
	]
}).appendTo(SkyEngine.Screen);
```

타일 맵 노드들이 공통으로 사용하는 파라미터 목록은 다음과 같습니다.
- `tileWidth` 타일의 너비
- `tileHeight` 타일의 높이
- `tileMap` 타일 맵을 구성하는 타일들의 2차원 배열
- `tileSet` `tileKeyMap`으로 타일 맵을 구성하기 위한 타일과 타일에 해당하는 키의 목록
- `tileKeyMap` `tileSet`에 선언한 타일들과 키를 기반으로 타일 맵을 구성하기 위한 키들의 2차원 배열

타일 맵 노드들에서 공통으로 사용 가능한 함수들은 다음과 같습니다.
- `getTileWidth()` 타일의 너비를 가져옵니다.
- `getTileHeight()` 타일의 높이를 가져옵니다.
- `addTile({row:, col:, tile:})` `addTile({row:, col:, key:})` 특정 위치에 타일을 추가합니다.
- `getTileKey({row:, col:})` 특정 위치의 타일의 키를 가져옵니다.
- `getTile({row:, col:})` 특정 위치의 타일을 가져옵니다.
- `moveTile({fromRow:, fromCol:, toRow:, toCol:})` `moveTile({fromRow:, fromCol:, toRow:, toCol:, speed:, accel:}, endHandler)` 타일을 이동시킵니다.

## Isomatric 타일 맵 노드
`SkyEngine.IsomatricTileMap`

Isomatric 타일 맵을 생성합니다.

![Isomatric 타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/isomatrictilemap.png)

```javascript
let isomatricTileMap = SkyEngine.IsometricTileMap({
	centerX : 64 * 4,
	centerY : 33 * 4,
	tileWidth : 64,
	tileHeight : 33,
	tileSet : {
		grass : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					centerY : 10,
					src : SkyEngineShowcase.R('tile/igrass.png')
				})
			});
		},
		water : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					centerY : 16,
					src : SkyEngineShowcase.R('tile/iwater.png')
				})
			});
		},
		sand : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					centerY : 16,
					src : SkyEngineShowcase.R('tile/isand.png')
				})
			});
		}
	},
	tileKeyMap : [
		['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'water', 'sand',  'sand',  'grass', 'grass', 'grass', 'grass'],
			['water', 'water', 'sand',  'sand',  'grass', 'grass', 'grass', 'grass'],
		['water', 'water', 'water', 'water', 'sand',  'grass', 'grass', 'grass'],
			['water', 'water', 'water', 'water', 'sand',  'grass', 'grass', 'grass'],
		['water', 'water', 'water', 'water', 'water', 'sand',  'sand',  'grass'],
			['water', 'water', 'water', 'water', 'water', 'sand',  'sand',  'sand' ],
		['water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand' ],
			['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
		['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
			['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water']
	]
}).appendTo(SkyEngine.Screen);
```

## Hexagon 타일 맵 노드
`SkyEngine.HexagonTileMap`

Haxegon 타일 맵을 생성합니다.

![Haxegon 타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/hexagontilemap.png)

```javascript
let hexagonTileMap = SkyEngine.HexagonTileMap({
	centerX : 110 * 3.5,
	centerY : (128 - 31) * 3.5,
	tileWidth : 110,
	tileHeight : 128,
	overlapHeight : 31,
	tileSet : {
		grass : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hgrass.png')
				})
			});
		},
		water : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hwater.png')
				})
			});
		},
		sand : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hsand.png')
				})
			});
		},
		mountain : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hmountain.png')
				})
			});
		},
		fire : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hfire.png')
				})
			});
		}
	},
	tileKeyMap : [
		['sand',  'water', 'sand',  'grass', 'grass', 'grass', 'mountain', 'mountain'],
		['sand',  'water', 'sand',  'water', 'water', 'water', 'grass',    'mountain'],
		['sand',  'water', 'sand',  'water', 'grass', 'water', 'grass',    'grass'   ],
		['sand',  'water', 'grass', 'water', 'grass', 'water', 'grass',    'grass'   ],
		['sand',  'water', 'grass', 'water', 'grass', 'water', 'water',    'water'   ],
		['grass', 'water', 'grass', 'water', 'grass', 'grass', 'grass',    'grass'   ],
		['grass', 'water', 'water', 'water', 'grass', 'grass', 'fire',     'fire'    ],
		['grass', 'grass', 'grass', 'grass', 'grass', 'fire',  'fire',     'fire'    ]
	]
}).appendTo(SkyEngine.Screen);
```

Hexagon 타일 맵에서는 `overlapHeight` 파라미터를 통해 타일들 끼리 겹치는 정도를 지정할 수 있습니다.

## 타일 노드
`SkyEngine.Tile`

일반적인 타일을 생성합니다.

## 충돌 타일 노드
`SkyEngine.CollisionTile`

충돌용 타일을 생성합니다. 일반적으로 캐릭터들이 움직일 수 있는 땅을 구성하는데 사용됩니다.

```javascript

```