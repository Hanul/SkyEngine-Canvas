# SkyEngine
[UPPERCASE](http://uppercase.io) 기반 게임 엔진

## 특징
* HTML5 Canvas 기반 게임 엔진입니다.
* 모든 게임 오브젝트는 노드 트리로 이루어져 있습니다.
* 웹 페이지 전체 화면을 게임 화면으로 사용합니다.
* 화면의 가운데가 0, 0 좌표 입니다.

## 다른 게임 엔진과의 차이점
* 이벤트 기반으로 게임이 동작합니다. 즉 일반적인 게임 엔진 에서의 `step`, `update` 등의 함수를 작성하지 않습니다.
* 텍스쳐를 더 이상 생각하지 않아도 됩니다.

## 설치하기
1. 프로젝트의 `DEPENDENCY` 파일에 `Hanul/SkyEngine`를 추가합니다.
2. [`ubm`](https://www.npmjs.com/package/ubm)을 이용해 설치합니다.
    ```
    ubm install
    ```

## 문서
* [튜토리얼](DOC/Tutorial.md)
* [가이드](DOC/Guide.md)
* [API 문서](API/README.md)

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)