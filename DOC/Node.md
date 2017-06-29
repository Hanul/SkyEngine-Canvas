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

SkyEngine의 모든 구성요소는 노드입니다. 즉 SkyEngine을 기반으로 한 게임은 노드들의 집합이라 할 수 있습니다.

개발의 관점에서 살펴보면, SkyEngine의 모든 노드 클래스는 `SkyEngine.Node`를 상속합니다.

`SkyEngine.Node`에는 노드의 움직임, 크기조절, 회전, 페이드 인/아웃 등 각종 기능이 포함되어 있습니다.

사용 가능한 파라미터는 다음과 같습니다.
## 위치 관련 파라미터
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

## 배율 관련 파라미터
- `scale` 배율
- `scaleX` x 배율
- `scaleY` y 배율
- `scalingSpeed` 배율이 커지는 속도
- `scalingSpeedX` x 배율이 커지는 속도
- `scalingSpeedY` y 배율이 커지는 속도
- `scalingAccel` 배율이 커지는 가속도
- `scalingAccelX` x 배율이 커지는 가속도
- `scalingAccelY` y 배율이 커지는 가속도
- `minScalingSpeed` 배율이 커지는 최소 속도
- `minScalingSpeedX` x 배율이 커지는 최소 속도
- `minScalingSpeedY` y 배율이 커지는 최소 속도
- `maxScalingSpeed` 배율이 커지는 최대 속도
- `maxScalingSpeedX` x 배율이 커지는 최대 속도
- `maxScalingSpeedY` y 배율이 커지는 최대 속도
- `toScale` 배율이 커지는 목적지
- `toScaleX` x 배율이 커지는 목적지
- `toScaleY` y 배율이 커지는 목적지

## 회전 관련 파라미터
- `angle` 회전 각도
- `rotationSpeed` 회전 속도
- `rotationAccel` 회전 가속도
- `minRotationSpeed` 최소 회전 속도
- `maxRotationSpeed` 최대 회전 속도
- `toAngle` 회전 각도 목적지

## 페이드 관련 파라미터
- `alpha` 알파 값
- `fadingSpeed` 페이드 속도
- `fadingAccel` 페이드 가속도
- `minFadingSpeed` 최소 페이드 속도
- `maxFadingSpeed` 최대 페이드 속도
- `toAlpha` 페이드 알파 값 목적지

## 기타 파라미터
- `collider` 충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Area.md)를 참고해주시기 바랍니다.
- `touchArea` 터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Area.md)를 참고해주시기 바랍니다.
- `c` 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
- `on` 이벤트. 이벤트에 관한 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.

사용 가능한 함수는 다음과 같습니다.
## 위치 관련 함수
### 파라미터 설정
- `setX(x)`
- `getX()`
- `setY(y)`
- `getY()`
- `setZ(z)`
- `getZ()`
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

## 배율 관련 함수
### 파라미터 설정
- `setScaleX(scaleX)`
- `getScaleX()`
- `setScaleY(scaleY)`
- `getScaleY()`
- `setScale(scale)` x 배율과 y 배율을 동시에 설정합니다.
- `setScalingSpeedX(scalingSpeedX)`
- `getScalingSpeedX()`
- `setScalingSpeedY(scalingSpeedY)`
- `getScalingSpeedY()` x 배율과 y 배율이 커지는 속도를 동시에 설정합니다.
- `setScalingSpeed(scalingSpeed)`
- `setScalingAccelX(scalingAccelX)`
- `getScalingAccelX()`
- `setScalingAccelY(scalingAccelY)`
- `getScalingAccelY()`
- `setScalingAccel(scalingAccel)` x 배율과 y 배율이 커지는 가속도를 동시에 설정합니다.
- `setMinScalingSpeedX(minScalingSpeedX)`
- `getMinScalingSpeedX()`
- `setMinScalingSpeedY(minScalingSpeedY)`
- `getMinScalingSpeedY()`
- `setMinScalingSpeed(minScalingSpeed)` x 배율과 y 배율이 커지는 최소 속도를 동시에 설정합니다.
- `setMaxScalingSpeedX(maxScalingSpeedX)`
- `getMaxScalingSpeedX()`
- `setMaxScalingSpeedY(maxScalingSpeedY)`
- `getMaxScalingSpeedY()`
- `setMaxScalingSpeed(maxScalingSpeed)` x 배율과 y 배율이 커지는 최대 속도를 동시에 설정합니다.
- `setToScaleX(toScaleX)`
- `getToScaleX()`
- `setToScaleY(toScaleY)`
- `getToScaleY()`
- `setToScale(toScale)` x 배율과 y 배율의 목적지를 동시에 설정합니다.

## 회전 관련 함수
### 파라미터 설정
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

## 페이드 관련
### 파라미터 설정
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

## 기타 함수

## 이벤트
### `on`
- `'tap'`
- `'touchstart'`
- `'touchend'`
- `'offscreen'` 노드가 화면을 벗어날 때
- `'nextstep'` 다음 프레임으로 넘어갈 때
- `'move'` 노드가 움직일 때

### `onMeet`

### `onPart`

## 필터

## 블렌드 모드

## 노드 확장하기

## 내장 확장 노드
### 도형 노드
* [직선 노드](Node/Line.md)
* [사각형 노드](Node/Rect.md)
* [원 노드](Node/Circle.md)
* [다각형 노드](Node/Polygon.md)

### 이미지 노드
* [이미지 노드](Node/Image.md)
* [스프라이트 애니메이션 노드](Node/Sprite.md)
* [실루엣 노드](Node/Silhouette.md)

### DOM 노드
* [DOM 노드](Node/Dom.md)

