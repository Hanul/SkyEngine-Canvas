작성중

# 노드
```javascript
SkyEngine.Node({
	x : 30,
	y : -40,
	c : SkyEngine.Circle({
		width : 50,
		height : 60,
		color : 'yellow'
	})
}).appendTo(SkyEngine.Screen);
```

SkyEngine의 모든 구성요소는 노드입니다. 즉 SkyEngine을 기반으로 한 게임은 노드들의 집합이라 할 수 있습니다. 따라서 SkyEngine의 모든 구성요소는 `SkyEngine.Node`를 상속합니다.

`SkyEngine.Node`에는 움직임, 크기조절, 회전, 페이드 인/아웃 등 각종 기능들이 포함되어 있습니다.

## 목차
- [파라미터](#파라미터)
    - [위치 관련 파라미터](#위치-관련-파라미터)
    - [스케일 관련 파라미터](#스케일-관련-파라미터)
    - [회전 관련 파라미터](#회전-관련-파라미터)
    - [페이드 관련 파라미터](#페이드-관련-파라미터)
    - [기타 파라미터](#기타-파라미터)
- [함수](#함수)
    - [파라미터 설정 함수](#파라미터-설정-함수)
    - [노드 관계 함수](#노드-관계-함수)
    - [이벤트 관련 함수](#이벤트-관련-함수)
    - [이동 관련 함수](#이동-관련-함수)
    - [회전 관련 함수](#회전-관련-함수)
    - [페이드 관련 함수](#페이드-관련-함수)
    - [필터 관련 함수](#필터-관련-함수)
    - [블렌드 모드 관련 함수](#블렌드-모드-관련-함수)
    - [기타 함수](#기타-함수)
- [이벤트](#이벤트)
- [필터](#필터)
- [블렌드 모드](#블렌드-모드)
- [노드 확장하기](#노드-확장하기)
- [내장 확장 노드](#내장-확장-노드)
    - [도형 노드](#도형-노드)
    - [이미지 노드](#이미지-노드)
    - [상태 세트 노드](#상태-세트-노드)
    - [타일 시스템 노드](#타일-시스템-노드)
    - [파티클 노드](#파티클-노드)

## 파라미터
사용 가능한 파라미터는 다음과 같습니다.

### 위치 관련 파라미터
- `x` x 좌표
- `y` y 좌표
- `z` 노드의 드로우 순서를 결정하기 위한 z 인덱스
- `speedX` x 좌표 이동 속도
- `speedY` y 좌표 이동 속도
- `accelX` x 좌표 이동 가속도
- `accelY` y 좌표 이동 가속도
- `minSpeedX` x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
- `minSpeedY` y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
- `maxSpeedX` x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
- `maxSpeedY` y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
- `toX` x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
- `toY` y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.

### 스케일 관련 파라미터
- `scale` 스케일
- `scaleX` x 스케일
- `scaleY` y 스케일
- `scalingSpeed` 스케일이 커지는 속도
- `scalingSpeedX` x 스케일이 커지는 속도
- `scalingSpeedY` y 스케일이 커지는 속도
- `scalingAccel` 스케일이 커지는 가속도
- `scalingAccelX` x 스케일이 커지는 가속도
- `scalingAccelY` y 스케일이 커지는 가속도
- `minScalingSpeed` 스케일이 커지는 최소 속도
- `minScalingSpeedX` x 스케일이 커지는 최소 속도
- `minScalingSpeedY` y 스케일이 커지는 최소 속도
- `maxScalingSpeed` 스케일이 커지는 최대 속도
- `maxScalingSpeedX` x 스케일이 커지는 최대 속도
- `maxScalingSpeedY` y 스케일이 커지는 최대 속도
- `toScale` 스케일이 커지는 목적지
- `toScaleX` x 스케일이 커지는 목적지
- `toScaleY` y 스케일이 커지는 목적지

### 회전 관련 파라미터
- `angle` 회전 각도
- `rotationSpeed` 회전 속도
- `rotationAccel` 회전 가속도
- `minRotationSpeed` 최소 회전 속도
- `maxRotationSpeed` 최대 회전 속도
- `toAngle` 회전 각도 목적지

### 페이드 관련 파라미터
- `alpha` 알파 값
- `fadingSpeed` 페이드 속도
- `fadingAccel` 페이드 가속도
- `minFadingSpeed` 최소 페이드 속도
- `maxFadingSpeed` 최대 페이드 속도
- `toAlpha` 페이드 알파 값 목적지

### 기타 파라미터
- `collider` 충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Node/Area.md)를 참고해주시기 바랍니다.
- `touchArea` 터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Node/Area.md)를 참고해주시기 바랍니다.
- `c` 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
- `on` 이벤트. 이벤트에 대한 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.

## 함수
노드에 사용 가능한 함수들은 다음과 같습니다.

### 파라미터 설정 함수
이하 파라미터 설정 함수들은 노드 생성 이후 파라미터를 추가로 지정하고자 하는 경우 사용합니다.
```javascript
let circle = SkyEngine.Circle({
	width : 50,
	height : 60,
	color : 'yellow'
}).appendTo(SkyEngine.Screen);

// 위치 지정
circle.setPosition({
    x : 100
    y : 200
});
```

#### [위치 관련 파라미터](#위치-관련-파라미터) 설정 함수
- `setX(x)`
- `getX()`
- `setY(y)`
- `getY()`
- `setZ(z)`
- `getZ()`
- `setPosition({x:, y:, z:})` x, y, z를 한번에 지정합니다.
- `setSpeedX(speedX)`
- `getSpeedX()`
- `setSpeedY(speedY)`
- `getSpeedY()`
- `setAccelX(accelX)`
- `getAccelX()`
- `setAccelY(accelY)`
- `getAccelY()`
- `setMinSpeedX(minSpeedX)`
- `getMinSpeedX()`
- `setMinSpeedY(minSpeedY)`
- `getMinSpeedY()`
- `setMaxSpeedX(maxSpeedX)`
- `getMaxSpeedX()`
- `setMaxSpeedY(maxSpeedY)`
- `getMaxSpeedY()`
- `setToX(toX)`
- `getToX()`
- `setToY(toY)`
- `getToY()`

#### [스케일 관련 파라미터](#스케일-관련-파라미터) 설정 함수
- `setScaleX(scaleX)`
- `getScaleX()`
- `setScaleY(scaleY)`
- `getScaleY()`
- `setScale(scale)` x 스케일과 y 스케일을 동시에 설정합니다.
- `setScalingSpeedX(scalingSpeedX)`
- `getScalingSpeedX()`
- `setScalingSpeedY(scalingSpeedY)`
- `getScalingSpeedY()` x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
- `setScalingSpeed(scalingSpeed)`
- `setScalingAccelX(scalingAccelX)`
- `getScalingAccelX()`
- `setScalingAccelY(scalingAccelY)`
- `getScalingAccelY()`
- `setScalingAccel(scalingAccel)` x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
- `setMinScalingSpeedX(minScalingSpeedX)`
- `getMinScalingSpeedX()`
- `setMinScalingSpeedY(minScalingSpeedY)`
- `getMinScalingSpeedY()`
- `setMinScalingSpeed(minScalingSpeed)` x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
- `setMaxScalingSpeedX(maxScalingSpeedX)`
- `getMaxScalingSpeedX()`
- `setMaxScalingSpeedY(maxScalingSpeedY)`
- `getMaxScalingSpeedY()`
- `setMaxScalingSpeed(maxScalingSpeed)` x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
- `setToScaleX(toScaleX)`
- `getToScaleX()`
- `setToScaleY(toScaleY)`
- `getToScaleY()`
- `setToScale(toScale)` x 스케일과 y 스케일의 목적지를 동시에 설정합니다.

#### [회전 관련 파라미터](#회전-관련-파라미터) 설정 함수
- `setAngle(angle)`
- `getAngle()`
- `setRotationSpeed(rotationSpeed)`
- `getRotationSpeed()`
- `setRotationAccel(rotationAccel)`
- `getRotationAccel()`
- `setMinRotationSpeed(minRotationSpeed)`
- `getMinRotationSpeed()`
- `setMaxRotationSpeed(maxRotationSpeed)`
- `getMaxRotationSpeed()`
- `setToAngle(toAngle)`
- `getToAngle()`

#### [페이드 관련 파라미터](#페이드-관련-파라미터) 설정 함수
- `setAlpha(alpha)`
- `getAlpha()`
- `setFadingSpeed(fadingSpeed)`
- `getFadingSpeed()`
- `setFadingAccel(fadingAccel)`
- `getFadingAccel()`
- `setMinFadingSpeed(minFadingSpeed)`
- `getMinFadingSpeed()`
- `setMaxFadingSpeed(maxFadingSpeed)`
- `getMaxFadingSpeed()`
- `setToAlpha(toAlpha)`
- `getToAlpha()`

### 노드 관계 함수
노드 트리를 구성하는데 사용되는 함수들입니다.
- `append(node)`
- `appendTo(node)`
- `getParent()`
- `getChildren()`
- `remove()`
- `checkIsRemoved()`

### 이벤트 관련 함수
이벤트에 대한 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.
- `on(eventName, eventHandler)`
- `off(eventName, eventHandler)`
- `fireEvent(eventName)`
- `onMeet(target, handler)`
- `offMeet(target, handler)`
- `onPart(target, handler)`
- `offPart(target, handler)`
- `addTouchArea(touchArea)`
- `getTouchAreas()`
- `addCollider(collider)`
- `getCollider()`
- `getColliders()`

### 이동 관련 함수
- `moveLeft(speed)` `moveLeft({speed:, accel:, maxSpeed:})`
- `stopLeft()` `stopLeft(accel)`
- `moveRight(speed)` `moveRight({speed:, accel:, maxSpeed:})`
- `stopRight()` `stopRight(accel)`
- `moveUp(speed)` `moveUp({speed:, accel:, maxSpeed:})`
- `stopUp()` `stopUp(accel)`
- `moveDown(speed)` `moveDown({speed:, accel:, maxSpeed:})`
- `stopDown()` `stopDown(accel)`
- `moveTo({toX:, toY:, speed:, accel:, maxSpeed:})`
- `stuckLeft()`
- `unstuckLeft()`
- `stuckRight()`
- `unstuckRight()`
- `stuckUp()`
- `unstuckUp()`
- `stuckDown()`

### 회전 관련 함수
- `rotate(speed)` `rotate({speed:, accel:, maxSpeed:})`
- `stopRotation()` `stopRotation(accel)`
- `rotateTo({toAngle:, speed:, accel:, minSpeed:, maxSpeed:})`

### 페이드 관련 함수
- `fadeIn(speed)` `fadeIn({speed:, accel:, maxSpeed:})`
- `fadeOut(speed)` `fadeOut({speed:, accel:, maxSpeed:})`
- `stopFading()` `stopFading(accel)`
- `fadeTo({toAlpha:, accel:, minSpeed:, maxSpeed:})`

### 필터 관련 함수
필터에 대한 자세한 내용은 [필터 항목](#필터)을 참고해주시기 바랍니다.
- `setFilter(filter)`
- `getFilter()`
- `removeFilter()`

### 블렌드 모드 관련 함수
블렌드 모드에 대한 자세한 내용은 [블렌드 모드 항목](#블렌드-모드)을 참고해주시기 바랍니다.
- `setBlendMode(blendMode)`
- `getBlendMode()`
- `removeBlendMode()`

### 기타 함수
- `hide()`
- `show()`
- `checkIsHiding()`
- `flipX()`
- `flipY()`
- `clone()`

## 이벤트
### `on`
- `'tap'`
- `'touchstart'`
- `'touchend'`
- `'offscreen'` 노드가 화면을 벗어날 때
- `'nextstep'` 다음 프레임으로 넘어갈 때
- `'move'` 노드가 움직일 때
- `'remove'` 

### `onMeet`

### `onPart`

## 필터
노드에 블러 효과나 흑백 효과와 같은 그래픽 필터를 적용시킬 수 있습니다.

https://developer.mozilla.org/en-US/docs/Web/CSS/filter

```javascript
// 여러 효과 동시에 적용
```

## 블렌드 모드
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation


## 노드 확장하기

## 내장 확장 노드
### 도형 노드
* [직선 노드](DOC/Node/Figure/Line.md)
* [사각형 노드](DOC/Node/Figure/Rect.md)
* [원형 노드](DOC/Node/Figure/Circle.md)
* [폴리곤 노드](DOC/Node/Figure/Polygon.md)

### 이미지 노드
* [이미지 노드](DOC/Node/Image/Image.md)
* [스프라이트 노드](DOC/Node/Image/Sprite.md)
* [실루엣 노드](DOC/Node/Image/Silhouette.md)
* [배경 노드](DOC/Node/Image/Background.md)

### [상태 세트 노드](DOC/Node/StateSet.md)

### 타일 시스템 노드
* [타일 노드](DOC/Node/TileSystem/Tile.md)
* [충돌 타일 노드](DOC/Node/TileSystem/CollisionTile.md)
* [타일맵 노드](DOC/Node/TileSystem/TileMap.md)
* [아이소메트릭 타일맵 노드](DOC/Node/TileSystem/IsometricTileMap.md)
* [헥사곤 타일맵 노드](DOC/Node/TileSystem/HexagonTileMap.md)

### [파티클 시스템 노드](ParticleSystem.md)
