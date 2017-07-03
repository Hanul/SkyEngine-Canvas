# `CLASS ` SkyEngine.Line
직선 노드

## Mom CLASS
`SkyEngine.Figure`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.startX*
* `REQUIRED` *params.startY*
* `REQUIRED` *params.endX*
* `REQUIRED` *params.endY*
* `OPTIONAL` *params.isEndless*

## Static Members

### `findLineIntersectionPoint(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, targetX, targetY, targetStartX, targetStartY, targetEndX, targetEndY, targetScaleX, targetScaleY, targetSin, targetCos)`

### `findRectIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos)`

### `findCircleIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos)`

### `findPolygonIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos)`

### `findRaycastPoints(pointX, pointY, lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos)`

## Public Members

### `setStartX(_startX)`

### `getStartX()`

### `setStartY(_startY)`

### `getStartY()`

### `setEndX(_endX)`

### `getEndX()`

### `setEndY(_endY)`

### `getEndY()`

### `findIntersectionPoints(target)`
