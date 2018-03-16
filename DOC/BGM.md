# `SkyEngine.BGM`
[UPPERCASE의 SOUND 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#sound)을 게임의 배경음악 재생에 어울리도록 확장한 클래스

배경음악 클래스는 기본적으로 음악을 반복 재생하며, PC 환경의 웹 브라우저에서 다른 탭으로 이동하거나, 모바일 환경에서 웹 브라우저를 내리면 사운드가 일시정지합니다.

아래와 같은 파라미터들을 사용할 수 있습니다.

- `ogg` OGG 사운드 파일 경로
- `mp3` MP3 사운드 파일 경로

OGG 파일과 MP3 파일 중 브라우저가 지원하는 포맷의 사운드 파일을 재생합니다.

```javascript
let bgm = SkyEngine.BGM({
	ogg : 'bgm.ogg',
	mp3 : 'bgm.mp3'
});

// 배경음악 재생
bgm.play();

// 배경음악 중단
bgm.stop();
```

*iOS 기기에서는 페이지 접속 후 터치 이벤트가 한번 이상 발생해야 사운드가 재생됩니다. 처음부터 자동으로 재생되지 않습니다.*