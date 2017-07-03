# `CLASS ` SkyEngine.Node
노드 트리를 구성하기 위한 노드 클래스

## Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.x* x 좌표
* `OPTIONAL` *params.y* y 좌표
* `OPTIONAL` *params.z* 노드의 드로우 순서를 결정하기 위한 z 인덱스
* `OPTIONAL` *params.centerX* 중점의 x 좌표
* `OPTIONAL` *params.centerY* 중점의 y 좌표
* `OPTIONAL` *params.speedX* x 좌표 이동 속도
* `OPTIONAL` *params.speedY* y 좌표 이동 속도
* `OPTIONAL` *params.accelX* x 좌표 이동 가속도
* `OPTIONAL` *params.accelY* y 좌표 이동 가속도
* `OPTIONAL` *params.minSpeedX* x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.minSpeedY* y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.maxSpeedX* x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.maxSpeedY* y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.toX* x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.toY* y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.scale* 스케일
* `OPTIONAL` *params.scaleX* x 스케일
* `OPTIONAL` *params.scaleY* y 스케일
* `OPTIONAL` *params.scalingSpeed* 스케일이 커지는 속도
* `OPTIONAL` *params.scalingSpeedX* x 스케일이 커지는 속도
* `OPTIONAL` *params.scalingSpeedY* y 스케일이 커지는 속도
* `OPTIONAL` *params.scalingAccel* 스케일이 커지는 가속도
* `OPTIONAL` *params.scalingAccelX* x 스케일이 커지는 가속도
* `OPTIONAL` *params.scalingAccelY* y 스케일이 커지는 가속도
* `OPTIONAL` *params.minScalingSpeed* 스케일이 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedX* x 스케일이 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedY* y 스케일이 커지는 최소 속도
* `OPTIONAL` *params.maxScalingSpeed* 스케일이 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedX* x 스케일이 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedY* y 스케일이 커지는 최대 속도
* `OPTIONAL` *params.toScale* 스케일이 커지는 목적지
* `OPTIONAL` *params.toScaleX* x 스케일이 커지는 목적지
* `OPTIONAL` *params.toScaleY* y 스케일이 커지는 목적지
* `OPTIONAL` *params.angle* 회전 각도
* `OPTIONAL` *params.rotationSpeed* 회전 속도
* `OPTIONAL` *params.rotationAccel* 회전 가속도
* `OPTIONAL` *params.minRotationSpeed* 최소 회전 속도
* `OPTIONAL` *params.maxRotationSpeed* 최대 회전 속도
* `OPTIONAL` *params.toAngle* 회전 각도 목적지
* `OPTIONAL` *params.alpha* 알파 값
* `OPTIONAL` *params.fadingSpeed* 페이드 속도
* `OPTIONAL` *params.fadingAccel* 페이드 가속도
* `OPTIONAL` *params.minFadingSpeed* 최소 페이드 속도
* `OPTIONAL` *params.maxFadingSpeed* 최대 페이드 속도
* `OPTIONAL` *params.toAlpha* 페이드 알파 값 목적지
* `OPTIONAL` *params.collider* 충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.touchArea* 터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.c* 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.on* 이벤트

## Public Members

### `setX(_x)`
#### Parameters
* `REQUIRED` *x*

### `getX()`

### `setY(_y)`
#### Parameters
* `REQUIRED` *y*

### `getY()`

### `setZ(_z)`
#### Parameters
* `REQUIRED` *z*

### `getZ()`

### `setPosition(position)`
x, y, z를 한번에 지정합니다.
#### Parameters
* `REQUIRED` *position*
* `OPTIONAL` *position.x*
* `OPTIONAL` *position.y*
* `OPTIONAL` *position.z*

### `setCenterX(_centerX)`
#### Parameters
* `REQUIRED` *centerX*

### `getCenterX()`

### `setCenterY(_centerY)`
#### Parameters
* `REQUIRED` *centerY*

### `getCenterY()`

### `setSpeedX(_speedX)`
#### Parameters
* `REQUIRED` *speedX*

### `getSpeedX()`

### `setSpeedY(_speedY)`
#### Parameters
* `REQUIRED` *speedY*

### `getSpeedY()`

### `setAccelX(_accelX)`
#### Parameters
* `REQUIRED` *accelX*

### `getAccelX()`

### `setAccelY(_accelY)`
#### Parameters
* `REQUIRED` *accelY*

### `getAccelY()`

### `setMinSpeedX(_minSpeedX)`
#### Parameters
* `REQUIRED` *minSpeedX*

### `getMinSpeedX()`

### `setMinSpeedY(_minSpeedY)`
#### Parameters
* `REQUIRED` *minSpeedY*

### `getMinSpeedY()`

### `setMaxSpeedX(_maxSpeedX)`
#### Parameters
* `REQUIRED` *maxSpeedX*

### `getMaxSpeedX()`

### `setMaxSpeedY(_maxSpeedY)`
#### Parameters
* `REQUIRED` *maxSpeedY*

### `getMaxSpeedY()`

### `setToX(_toX)`
#### Parameters
* `REQUIRED` *toX*

### `getToX()`

### `setToY(_toY)`
#### Parameters
* `REQUIRED` *toY*

### `getToY()`

### `setScaleX(_scaleX)`
#### Parameters
* `REQUIRED` *scaleX*

### `getScaleX()`

### `setScaleY(_scaleY)`
#### Parameters
* `REQUIRED` *scaleY*

### `getScaleY()`

### `setScale(scale)`
x 스케일과 y 스케일을 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scale*

### `setScalingSpeedX(_scalingSpeedX)`
#### Parameters
* `REQUIRED` *scalingSpeedX*

### `getScalingSpeedX()`

### `setScalingSpeedY(_scalingSpeedY)`
#### Parameters
* `REQUIRED` *scalingSpeedY*

### `getScalingSpeedY()`

### `setScalingSpeed(scalingSpeed)`
x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scalingSpeed*

### `setScalingAccelX(_scalingAccelX)`
#### Parameters
* `REQUIRED` *scalingAccelX*

### `getScalingAccelX()`

### `setScalingAccelY(_scalingAccelY)`
#### Parameters
* `REQUIRED` *scalingAccelY*

### `getScalingAccelY()`

### `setScalingAccel(scalingAccel)`
x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scalingAccel*

### `setMinScalingSpeedX(_minScalingSpeedX)`
#### Parameters
* `REQUIRED` *minScalingSpeedX*

### `getMinScalingSpeedX()`

### `setMinScalingSpeedY(_minScalingSpeedY)`
#### Parameters
* `REQUIRED` *minScalingSpeedY*

### `getMinScalingSpeedY()`

### `setMinScalingSpeed(minScalingSpeed)`
x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *minScalingSpeed*

### `setMaxScalingSpeedX(_maxScalingSpeedX)`
#### Parameters
* `REQUIRED` *maxScalingSpeedX*

### `getMaxScalingSpeedX()`

### `setMaxScalingSpeedY(_maxScalingSpeedY)`
#### Parameters
* `REQUIRED` *maxScalingSpeedY*

### `getMaxScalingSpeedY()`

### `setMaxScalingSpeed(maxScalingSpeed)`
x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *maxScalingSpeed*

### `setToScaleX(_toScaleX)`
#### Parameters
* `REQUIRED` *toScaleX*

### `getToScaleX()`

### `setToScaleY(_toScaleY)`
#### Parameters
* `REQUIRED` *toScaleY*

### `getToScaleY()`

### `setToScale(toScale)`
x 스케일과 y 스케일의 목적지를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *toScale*

### `setAngle(_angle)`
#### Parameters
* `REQUIRED` *angle*

### `getAngle()`

### `setRotationSpeed(_rotationSpeed)`
#### Parameters
* `REQUIRED` *rotationSpeed*

### `getRotationSpeed()`

### `setRotationAccel(_rotationAccel)`
#### Parameters
* `REQUIRED` *rotationAccel*

### `getRotationAccel()`

### `setMinRotationSpeed(_minRotationSpeed)`
#### Parameters
* `REQUIRED` *minRotationSpeed*

### `getMinRotationSpeed()`

### `setMaxRotationSpeed(_maxRotationSpeed)`
#### Parameters
* `REQUIRED` *maxRotationSpeed*

### `getMaxRotationSpeed()`

### `setToAngle(_toAngle)`
#### Parameters
* `REQUIRED` *toAngle*

### `getToAngle()`

### `setAlpha(_alpha)`
#### Parameters
* `REQUIRED` *alpha*

### `getAlpha()`

### `setFadingSpeed(_fadingSpeed)`
#### Parameters
* `REQUIRED` *fadingSpeed*

### `getFadingSpeed()`

### `setFadingAccel(_fadingAccel)`
#### Parameters
* `REQUIRED` *fadingAccel*

### `getFadingAccel()`

### `setMinFadingSpeed(_minFadingSpeed)`
#### Parameters
* `REQUIRED` *minFadingSpeed*

### `getMinFadingSpeed()`

### `setMaxFadingSpeed(_maxFadingSpeed)`
#### Parameters
* `REQUIRED` *maxFadingSpeed*

### `getMaxFadingSpeed()`

### `setToAlpha(_toAlpha)`
#### Parameters
* `REQUIRED` *toAlpha*

### `getToAlpha()`

### `getDrawingX()`

### `getDrawingY()`

### `getRealX()`

### `getRealY()`

### `getRealScaleX()`

### `getRealScaleY()`

### `getRealRadian()`

### `getRealSin()`

### `getRealCos()`

### `getBeforeX()`

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

### `stuckLeft()`

### `unstuckLeft()`

### `stuckRight()`

### `unstuckRight()`

### `stuckUp()`

### `unstuckUp()`

### `stuckDown()`

### `unstuckDown()`

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

### `getTouchArea()`

### `addCollider(collider)`
#### Parameters
* `REQUIRED` *collider*

### `getColliders()`

### `getCollider()`

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
