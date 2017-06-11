# CLASS `SkyEngine.TileMap(inner, self, params)`
타일 맵

## Mom CLASS
`SkyEngine.Node`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.tileWidth*
* `REQUIRED` *params.tileHeight*
* `OPTIONAL` *params.tileMap*
* `OPTIONAL` *params.tileKeySet*
* `OPTIONAL` *params.tileKeyMap*
* `OPTIONAL` *params.collisionMap*

## Public Members

### `getTileWidth()`

### `getTileHeight()`

### `addTile(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*
* `REQUIRED` *params.tile*
* `OPTIONAL` *params.isCollider*

### `getCollisionMap()`

### `findPath(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.startRow*
* `REQUIRED` *params.startCol*
* `REQUIRED` *params.endRow*
* `REQUIRED` *params.endCol*
