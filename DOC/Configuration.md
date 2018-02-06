작성중

# 설정
[UPPERCASE의 프로젝트 실행을 위한 코드](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/CREATE_PROJECT.md#프로젝트-실행을-위한-코드-작성)의 `BROWSER_CONFIG` 부분에 `SkyEngine` 설정을 등록합니다.

```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		...
	},
	
	BROWSER_CONFIG : {
		SkyEngine : {
			isDebugMode : true,
			width : 720,
			height : 1280
		}
	},
	
	NODE_CONFIG : {
		...
	}
});
```

SkyEngine에는 아래와 같은 설정들을 사용할 수 있습니다.
- `isDebugMode` 디버그 모드. `true`로 지정하면 활성화됩니다. [디버그 모드](#디버그-모드) 항목을 참고해주시기 바랍니다.
- `width` 게임의 고정 너비. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `height` 게임의 고정 높이. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxWidth` 게임 화면이 가변적인 경우 최대 너비. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxHeight` 게임 화면이 가변적인 경우 최대 높이. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxCollisionWidth` 성능 최적화를 위한 최대 충돌 범위의 너비. [최대 충돌 계산 범위](#최대-충돌-계산-범위) 항목을 참고해주시기 바랍니다.
- `maxCollisionHeight` 성능 최적화를 위한 최대 충돌 범위의 높이. [최대 충돌 계산 범위](#최대-충돌-계산-범위) 항목을 참고해주시기 바랍니다.

## 디버그 모드


## 게임 화면 크기


## 최대 충돌 계산 범위
게임의 성능을 최적화 하기 위해 최대 충돌 계산 범위를 지정합니다. 이러면 충돌을 계산할 때, 정해진 범위 내의 노드만 계산합니다.