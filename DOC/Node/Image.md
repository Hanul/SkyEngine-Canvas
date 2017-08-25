작성중

# 이미지

## 공통 설정 파라미터
[노드](../Node.md)의 파라미터 외에 모든 이미지 관련 노드들에서 공통으로 설정할 수 있는 파라미터 목록은 다음과 같습니다.

### `src`
이미지의 경로를 지정합니다. [스프라이트 애니메이션 노드](#스프라이트-애니메이션-노드)의 경우, 여러장의 이미지를 포함할 때는 `srcs`를 사용합니다.

![이미지의 경로](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/src.png)

```javascript
let earth = SkyEngine.Image({
	src : Sample.R('earth.png')
}).appendTo(SkyEngine.Screen);
```

## 공통 이벤트
- `'load'` 이미지 로딩이 완료되었을 때

## 이미지 노드

## 스프라이트 애니메이션 노드
- `spriteWidth` 스프라이트의 너비를 지정할 수 있습니다.
- `spriteHeight` 스프라이트의 높이를 지정할 수 있습니다.
- `fps` 애니메이션의 속도를 초당 프레임 수로 지정할 수 있습니다.

### 단일 이미지인 경우
단일 이미지에 여러 그림이 그려져 있는 경우

### 여러 이미지인 경우
여러 이미지에 각각 그림이 그려져 있는 경우

여러 이미지로 애니메이션을 생성하는 경우 단일 이미지의 크기를 알 수 있으므로 `spriteWidth`와 `spriteHeight` 설정이 불필요합니다.

### 이벤트
- `'animationend'` 애니메이션이 끝날 때
- `'framechange'` 애니메이션의 프레임이 변경될 때

## 실루엣 노드
- `color` 실루엣의 색상을 설정할 수 있습니다.
- `border` 실루엣의 테두리를 설정할 수 있습니다. `두께 모양 색상` 순서대로 문자열로 지정합니다. 모양으로는 `'solid'`, `'dotted'`, `'dashed'`를 지정할 수 있습니다.

## 배경 노드
- `'isNotToRepeatX'` `true`로 설정하면 배경 이미지를 x축으로 반복하지 않습니다.
- `'isNotToRepeatY'` `true`로 설정하면 배경 이미지를 y축으로 반복하지 않습니다.