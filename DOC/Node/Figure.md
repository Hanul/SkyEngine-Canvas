작성중

# 도형
도형 노드들을 사용하여 직선, 사각형, 원, 다각형을 생성할 수 있습니다. 이 중 사각형, 원, 다각형 노드는 터치 영역 및 충돌 영역으로도 사용될 수 있습니다.

# ![도형들](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/images/figures.png)

## 공통 설정 파라미터
모든 도형 노드들에서 공통으로 설정할 수 있는 파라미터 목록은 다음과 같습니다.

### `color`
도형의 색상을 설정할 수 있습니다.

```javascript
// 빨간 원을 생성합니다.
let circle = SkyEngine.Circle({
	width : 100,
	height : 100,
	color : '#ff0000'
}).appendTo(SkyEngine.Screen);

// 파란 사각형을 생성합니다.
let rect = SkyEngine.Rect({
	width : 100,
	height : 100,
	color : '#0000ff'
}).appendTo(SkyEngine.Screen);
```

### `border`
도형의 테두리를 설정할 수 있습니다. `두께 모양 색상` 순서대로 문자열로 지정합니다.

모양으로는 `'solid'`, `'dotted'`, `'dashed'`를 지정할 수 있습니다.

```javascript
// 빨간 테두리의 원을 생성합니다.
let circle = SkyEngine.Circle({
	width : 100,
	height : 100,
	border : '5px solid #ff0000'
}).appendTo(SkyEngine.Screen);

// 파란 점선 테두리의 사각형을 생성합니다.
let rect = SkyEngine.Rect({
	width : 100,
	height : 100,
	border : '5px dotted #0000ff'
}).appendTo(SkyEngine.Screen);
```

## 직선 노드
직선을 만듭니다.

```javascript
let line = SkyEngine.Line({
	y : -140,
	startX : -100,
	startY : -10,
	endX : 100,
	endY : 10,
	border : '5px solid red'
}).appendTo(SkyEngine.Screen);
```

[노드](../Node.md)의 파라미터들 외에 사용 가능한 파라미터는 다음과 같습니다.
- `startX`
- `startY`
- `endX`
- `endY`
- `border`

## 사각형 노드

## 원 노드

## 다각형 노드

## 영역으로 사용되는 도형 노드들
사각형, 원, 다각형 노드는 터치 영역 및 충돌 영역으로도 사용될 수 있습니다.
