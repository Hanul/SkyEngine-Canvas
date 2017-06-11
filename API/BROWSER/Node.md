# CLASS `SkyEngine.Node(inner, self, params)`
노드 트리를 구성하기 위한 노드 클래스

## Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.x					x* 좌표
* `OPTIONAL` *params.y					y* 좌표
* `OPTIONAL` *params.centerX				중점의* x 좌표
* `OPTIONAL` *params.centerY				중점의* y 좌표
* `OPTIONAL` *params.z					노드의* 드로우 순서를 결정하기 위한 z 인덱스
* `OPTIONAL` *params.speedX				x* 좌표 이동 속도
* `OPTIONAL` *params.speedY				y* 좌표 이동 속도
* `OPTIONAL` *params.accelX				x* 좌표 이동 가속도
* `OPTIONAL` *params.accelY				y* 좌표 이동 가속도
* `OPTIONAL` *params.minSpeedX			x* 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.minSpeedY			y* 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.maxSpeedX			x* 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.maxSpeedY			y* 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.toX					x* 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.toY					y* 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.scale				배율*
* `OPTIONAL` *params.scaleX				x* 배율
* `OPTIONAL` *params.scaleY				y* 배율
* `OPTIONAL` *params.scalingSpeed			배율이* 커지는 속도
* `OPTIONAL` *params.scalingSpeedX		x* 배율이 커지는 속도
* `OPTIONAL` *params.scalingSpeedY		y* 배율이 커지는 속도
* `OPTIONAL` *params.scalingAccel			배율이* 커지는 가속도
* `OPTIONAL` *params.scalingAccelX		x* 배율이 커지는 가속도
* `OPTIONAL` *params.scalingAccelY		y* 배율이 커지는 가속도
* `OPTIONAL` *params.minScalingSpeed		배율이* 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedX		x* 배율이 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedY		y* 배율이 커지는 최소 속도
* `OPTIONAL` *params.maxScalingSpeed		배율이* 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedX		x* 배율이 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedY		y* 배율이 커지는 최대 속도
* `OPTIONAL` *params.toScale				배율이* 커지는 목적지
* `OPTIONAL` *params.toScaleX				x* 배율이 커지는 목적지
* `OPTIONAL` *params.toScaleY				y* 배율이 커지는 목적지
* `OPTIONAL` *params.angle				회전* 각도
* `OPTIONAL` *params.rotationSpeed		회전* 속도
* `OPTIONAL` *params.rotationAccel		회전* 가속도
* `OPTIONAL` *params.minRotationSpeed		최소* 회전 속도
* `OPTIONAL` *params.maxRotationSpeed		최대* 회전 속도
* `OPTIONAL` *params.toAngle				회전* 각도 목적지
* `OPTIONAL` *params.alpha				알파* 값
* `OPTIONAL` *params.fadingSpeed			페이드* 속도
* `OPTIONAL` *params.fadingAccel			페이드* 가속도
* `OPTIONAL` *params.minFadingSpeed		최소* 페이드 속도
* `OPTIONAL` *params.maxFadingSpeed		최대* 페이드 속도
* `OPTIONAL` *params.toAlpha				페이드* 알파 값 목적지
* `OPTIONAL` *params.collider				충돌* 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.touchArea			터치* 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.c					자식* 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.on					이벤트*

## Public Members

### `setX(_x)`

### `getX()`

### `setY(_y)`

### `getY()`

### `setCenterX(_centerX)`

### `getCenterX()`

### `setCenterY(_centerY)`

### `getCenterY()`

### `setZ(_z)`

### `getZ()`

### `setSpeedX(_speedX)`

### `getSpeedX()`

### `setSpeedY(_speedY)`

### `getSpeedY()`

### `setAccelX(_accelX)`

### `getAccelX()`

### `setAccelY(_accelY)`

### `getAccelY()`

### `setMinSpeedX(_minSpeedX)`

### `getMinSpeedX()`

### `setMinSpeedY(_minSpeedY)`

### `getMinSpeedY()`

### `setMaxSpeedX(_maxSpeedX)`

### `getMaxSpeedX()`

### `setMaxSpeedY(_maxSpeedY)`

### `getMaxSpeedY()`

### `setToX(_toX)`

### `getToX()`

### `setToY(_toY)`

### `getToY()`

### `setScaleX(_scaleX)`
for scale

### `getScaleX()`

### `setScaleY(_scaleY)`

### `getScaleY()`

### `setScale(scale)`

### `setScalingSpeedX(_scalingSpeedX)`

### `getScalingSpeedX()`

### `setScalingSpeedY(_scalingSpeedY)`

### `getScalingSpeedY()`

### `setScalingSpeed(scalingSpeed)`

### `setScalingAccelX(_scalingAccelX)`

### `getScalingAccelX()`

### `setScalingAccelY(_scalingAccelY)`

### `getScalingAccelY()`

### `setScalingAccel(scalingAccel)`

### `setMinScalingSpeedX(_minScalingSpeedX)`

### `getMinScalingSpeedX()`

### `setMinScalingSpeedY(_minScalingSpeedY)`

### `getMinScalingSpeedY()`

### `setMinScalingSpeed(minScalingSpeed)`

### `setMaxScalingSpeedX(_maxScalingSpeedX)`

### `getMaxScalingSpeedX()`

### `setMaxScalingSpeedY(_maxScalingSpeedY)`

### `getMaxScalingSpeedY()`

### `setMaxScalingSpeed(maxScalingSpeed)`

### `setToScaleX(_toScaleX)`

### `getToScaleX()`

### `setToScaleY(_toScaleY)`

### `getToScaleY()`

### `setToScale(toScale)`

### `setAngle(_angle)`
for angle

### `getAngle()`

### `setRotationSpeed(_rotationSpeed)`

### `getRotationSpeed()`

### `setRotationAccel(_rotationAccel)`

### `getRotationAccel()`

### `setMinRotationSpeed(_minRotationSpeed)`

### `getMinRotationSpeed()`

### `setMaxRotationSpeed(_maxRotationSpeed)`

### `getMaxRotationSpeed()`

### `setToAngle(_toAngle)`

### `getToAngle()`

### `setAlpha(_alpha)`
for alpha

### `getAlpha()`

### `setFadingSpeed(_fadingSpeed)`

### `getFadingSpeed()`

### `setFadingAccel(_fadingAccel)`

### `getFadingAccel()`

### `setMinFadingSpeed(_minFadingSpeed)`

### `getMinFadingSpeed()`

### `setMaxFadingSpeed(_maxFadingSpeed)`

### `getMaxFadingSpeed()`

### `setToAlpha(_toAlpha)`

### `getToAlpha()`

### `getDrawingX()`
for real properties

### `getDrawingY()`

### `getRealX()`

### `getRealY()`

### `getRealScaleX()`

### `getRealScaleY()`

### `getRealRadian()`

### `getRealSin()`

### `getRealCos()`

### `getBeforeX()`
for before properties

### `getBeforeY()`

### `setFilter(_filterStyle)`
#### Parameters
* `REQUIRED` *filterStyle*

### `getFilter()`

### `removeFilter()`

### `setBlendMode(_blendMode)`
#### Parameters
* `REQUIRED` *blendMode*

### `getBlendMode()`

### `removeBlendMode()`

### `moveLeft(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopLeft(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveRight(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopRight(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveUp(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopUp(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveDown(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopDown(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveTo(params)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.toX*
* `OPTIONAL` *params.toY*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.maxSpeed*

### `rotate(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.minSpeed*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopRotation(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `rotateTo(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.toAngle*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.minSpeed*
* `OPTIONAL` *params.maxSpeed*

### `flipX()`

### `flipY()`

### `fadeIn(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `fadeOut(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopFading(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `fadeTo(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.toAlpha*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.minSpeed*
* `OPTIONAL` *params.maxSpeed*

### `hide()`

### `show()`

### `checkIsHiding()`

### `getChildren()`

### `getParent()`

### `setTarget(_targetNode)`

### `setParent(_parentNode)`

### `appendTo(node)`
#### Parameters
* `REQUIRED` *node*

### `append(node)`
#### Parameters
* `REQUIRED` *node*

### `remove()`

### `checkIsRemoved()`

### `on(eventName, eventHandler)`

### `off(eventName, eventHandler)`

### `fireEvent(eventName)`

### `onMeet(target, handler)`

### `offMeet(target, handler)`

### `runMeetHandlers(target, realTarget)`

### `onPart(target, handler)`

### `offPart(target, handler)`

### `runPartHandlers(target, realTarget)`

### `addTouchArea(touchArea)`
#### Parameters
* `REQUIRED` *touchArea*

### `getTouchAreas()`

### `addCollider(collider)`
#### Parameters
* `REQUIRED` *collider*

### `getColliders()`

### `checkPoint(pointX, pointY)`

### `checkArea(area)`

### `checkTouch(touchX, touchY)`

### `checkCollision(target)`

### `checkOffScreen()`

### `step(deltaTime)`

### `draw(context)`

### `drawArea(context)`

### `clone(appendParams)`
#### Parameters
* `OPTIONAL` *appendParams*
* `OPTIONAL` *appendParams.exceptChildNodes*
