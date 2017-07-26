/*
 * 노드 트리를 구성하기 위한 노드 클래스
 */
SkyEngine.Node = CLASS({

	init: (inner, self, params) => {
		//OPTIONAL: params

		//OPTIONAL: params.x					x 좌표
		//OPTIONAL: params.y					y 좌표
		//OPTIONAL: params.z					노드의 드로우 순서를 결정하기 위한 z 인덱스
		//OPTIONAL: params.centerX				중점의 x 좌표
		//OPTIONAL: params.centerY				중점의 y 좌표
		//OPTIONAL: params.speedX				x 좌표 이동 속도
		//OPTIONAL: params.speedY				y 좌표 이동 속도
		//OPTIONAL: params.accelX				x 좌표 이동 가속도
		//OPTIONAL: params.accelY				y 좌표 이동 가속도
		//OPTIONAL: params.minSpeedX			x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.minSpeedY			y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.maxSpeedX			x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.maxSpeedY			y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.toX					x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
		//OPTIONAL: params.toY					y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.

		//OPTIONAL: params.scale				스케일
		//OPTIONAL: params.scaleX				x 스케일
		//OPTIONAL: params.scaleY				y 스케일
		//OPTIONAL: params.scalingSpeed			스케일이 커지는 속도
		//OPTIONAL: params.scalingSpeedX		x 스케일이 커지는 속도
		//OPTIONAL: params.scalingSpeedY		y 스케일이 커지는 속도
		//OPTIONAL: params.scalingAccel			스케일이 커지는 가속도
		//OPTIONAL: params.scalingAccelX		x 스케일이 커지는 가속도
		//OPTIONAL: params.scalingAccelY		y 스케일이 커지는 가속도
		//OPTIONAL: params.minScalingSpeed		스케일이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedX		x 스케일이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedY		y 스케일이 커지는 최소 속도
		//OPTIONAL: params.maxScalingSpeed		스케일이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedX		x 스케일이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedY		y 스케일이 커지는 최대 속도
		//OPTIONAL: params.toScale				스케일이 커지는 목적지
		//OPTIONAL: params.toScaleX				x 스케일이 커지는 목적지
		//OPTIONAL: params.toScaleY				y 스케일이 커지는 목적지

		//OPTIONAL: params.angle				회전 각도
		//OPTIONAL: params.rotationSpeed		회전 속도
		//OPTIONAL: params.rotationAccel		회전 가속도
		//OPTIONAL: params.minRotationSpeed		최소 회전 속도
		//OPTIONAL: params.maxRotationSpeed		최대 회전 속도
		//OPTIONAL: params.toAngle				회전 각도 목적지

		//OPTIONAL: params.alpha				알파 값
		//OPTIONAL: params.fadingSpeed			페이드 속도
		//OPTIONAL: params.fadingAccel			페이드 가속도
		//OPTIONAL: params.minFadingSpeed		최소 페이드 속도
		//OPTIONAL: params.maxFadingSpeed		최대 페이드 속도
		//OPTIONAL: params.toAlpha				페이드 알파 값 목적지
		
		//OPTIONAL: params.filter
		//OPTIONAL: params.blendMode

		//OPTIONAL: params.collider				충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.touchArea			터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.c					자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.dom
		//OPTIONAL: params.on					이벤트

		// properties
		let x, y, z, centerX, centerY, scaleX, scaleY, angle, alpha;
		let speedX, speedY, scalingSpeedX, scalingSpeedY, rotationSpeed, fadingSpeed;
		let accelX, accelY, scalingAccelX, scalingAccelY, rotationAccel, fadingAccel;

		// min, max speed (undefined면 무제한)
		let minSpeedX, minSpeedY, minScalingSpeedX, minScalingSpeedY, minRotationSpeed, minFadingSpeed;
		let maxSpeedX, maxSpeedY, maxScalingSpeedX, maxScalingSpeedY, maxRotationSpeed, maxFadingSpeed;

		// to properties
		let toX, toY, toScaleX, toScaleY, toAngle, toAlpha;

		// real properties
		// real x, y는 center x, y를 고려한 노드의 실제 위치이며, drawing x, y는 center x, y를 고려하지 않은 중앙 기준의 위치 
		let realX, realY, drawingX, drawingY, realScaleX, realScaleY, realRadian, realSin, realCos;

		// before properties
		let beforeX, beforeY;

		let parentNode, targetNode;
		let childNodes = [];

		let isHiding = false;
		let isRemoved = false;

		let eventMap = {};

		let colliders = [];
		let touchAreas = [];
		let collisionTargets = [];
		let collidingNodeIds = {};

		let meetHandlerMap = {};

		let partHandlerMap = {};

		let filter;
		let blendMode;

		let isStuckLeft;
		let isStuckRight;
		let isStuckUp;
		let isStuckDown;
		
		let domWrapper;

		let genRealPosition = () => {

			if (targetNode === undefined) {
				realX = x;
				realY = y;
				drawingX = x;
				drawingY = y;
			} else {

				let plusX = x * targetNode.getRealScaleX();
				let plusY = y * targetNode.getRealScaleY();

				realX = targetNode.getDrawingX() + plusX * targetNode.getRealCos() - plusY * targetNode.getRealSin();
				realY = targetNode.getDrawingY() + plusX * targetNode.getRealSin() + plusY * targetNode.getRealCos();

				let plusCenterX = centerX * realScaleX;
				let plusCenterY = centerY * realScaleY;

				drawingX = realX - plusCenterX * realCos + plusCenterY * realSin;
				drawingY = realY - plusCenterX * realSin - plusCenterY * realCos;
			}
		};

		let setX = self.setX = (_x) => {
			//REQUIRED: x

			x = _x;
			genRealPosition();
		};

		let getX = self.getX = () => {
			return x;
		};

		let setY = self.setY = (_y) => {
			//REQUIRED: y

			y = _y;
			genRealPosition();
		};

		let getY = self.getY = () => {
			return y;
		};

		let setZ = self.setZ = (_z) => {
			//REQUIRED: z

			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};

		let getZ = self.getZ = () => {
			return z;
		};

		// x, y, z를 한번에 지정합니다.
		let setPosition = self.setPosition = (position) => {
			//REQUIRED: position
			//OPTIONAL: position.x
			//OPTIONAL: position.y
			//OPTIONAL: position.z

			if (position.x !== undefined) {
				x = position.x;
			}
			if (position.y !== undefined) {
				y = position.y;
			}

			if (position.x !== undefined || position.y !== undefined) {
				genRealPosition();
			}

			if (position.z !== undefined) {
				setZ(position.x);
			}
		};

		let setCenterX = self.setCenterX = (_centerX) => {
			//REQUIRED: centerX

			centerX = _centerX;
		};

		let getCenterX = self.getCenterX = () => {
			return centerX;
		};

		let setCenterY = self.setCenterY = (_centerY) => {
			//REQUIRED: centerY

			centerY = _centerY;
		};

		let getCenterY = self.getCenterY = () => {
			return centerY;
		};

		let setSpeedX = self.setSpeedX = (_speedX) => {
			//REQUIRED: speedX

			speedX = _speedX;
		};

		let getSpeedX = self.getSpeedX = () => {
			return speedX;
		};

		let setSpeedY = self.setSpeedY = (_speedY) => {
			//REQUIRED: speedY

			speedY = _speedY;
		};

		let getSpeedY = self.getSpeedY = () => {
			return speedY;
		};

		let setAccelX = self.setAccelX = (_accelX) => {
			//REQUIRED: accelX

			accelX = _accelX;
		};

		let getAccelX = self.getAccelX = () => {
			return accelX;
		};

		let setAccelY = self.setAccelY = (_accelY) => {
			//REQUIRED: accelY

			accelY = _accelY;
		};

		let getAccelY = self.getAccelY = () => {
			return accelY;
		};

		let setMinSpeedX = self.setMinSpeedX = (_minSpeedX) => {
			//REQUIRED: minSpeedX

			minSpeedX = _minSpeedX;
		};

		let getMinSpeedX = self.getMinSpeedX = () => {
			return minSpeedX;
		};

		let setMinSpeedY = self.setMinSpeedY = (_minSpeedY) => {
			//REQUIRED: minSpeedY

			minSpeedY = _minSpeedY;
		};

		let getMinSpeedY = self.getMinSpeedY = () => {
			return minSpeedY;
		};

		let setMaxSpeedX = self.setMaxSpeedX = (_maxSpeedX) => {
			//REQUIRED: maxSpeedX

			maxSpeedX = _maxSpeedX;
		};

		let getMaxSpeedX = self.getMaxSpeedX = () => {
			return maxSpeedX;
		};

		let setMaxSpeedY = self.setMaxSpeedY = (_maxSpeedY) => {
			//REQUIRED: maxSpeedY

			maxSpeedY = _maxSpeedY;
		};

		let getMaxSpeedY = self.getMaxSpeedY = () => {
			return maxSpeedY;
		};

		let setToX = self.setToX = (_toX) => {
			//REQUIRED: toX

			toX = _toX;
		};

		let getToX = self.getToX = () => {
			return toX;
		};

		let setToY = self.setToY = (_toY) => {
			//REQUIRED: toY

			toY = _toY;
		};

		let getToY = self.getToY = () => {
			return toY;
		};

		let setScaleX = self.setScaleX = (_scaleX) => {
			//REQUIRED: scaleX

			scaleX = _scaleX;

			if (targetNode === undefined) {
				realScaleX = scaleX;
			} else {
				realScaleX = targetNode.getRealScaleX() * scaleX;
			}
		};

		let getScaleX = self.getScaleX = () => {
			return scaleX;
		};

		let setScaleY = self.setScaleY = (_scaleY) => {
			//REQUIRED: scaleY

			scaleY = _scaleY;

			if (targetNode === undefined) {
				realScaleY = _scaleY;
			} else {
				realScaleY = targetNode.getRealScaleY() * scaleY;
			}
		};

		let getScaleY = self.getScaleY = () => {
			return scaleY;
		};

		// x 스케일과 y 스케일을 동시에 설정합니다.
		let setScale = self.setScale = (scale) => {
			//REQUIRED: scale

			setScaleX(scale);
			setScaleY(scale);
		};

		let setScalingSpeedX = self.setScalingSpeedX = (_scalingSpeedX) => {
			//REQUIRED: scalingSpeedX

			scalingSpeedX = _scalingSpeedX;
		};

		let getScalingSpeedX = self.getScalingSpeedX = () => {
			return scalingSpeedX;
		};

		let setScalingSpeedY = self.setScalingSpeedY = (_scalingSpeedY) => {
			//REQUIRED: scalingSpeedY

			scalingSpeedY = _scalingSpeedY;
		};

		let getScalingSpeedY = self.getScalingSpeedY = () => {
			return scalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
		let setScalingSpeed = self.setScalingSpeed = (scalingSpeed) => {
			//REQUIRED: scalingSpeed

			scalingSpeedX = scalingSpeed;
			scalingSpeedY = scalingSpeed;
		};

		let setScalingAccelX = self.setScalingAccelX = (_scalingAccelX) => {
			//REQUIRED: scalingAccelX

			scalingAccelX = _scalingAccelX;
		};

		let getScalingAccelX = self.getScalingAccelX = () => {
			return scalingAccelX;
		};

		let setScalingAccelY = self.setScalingAccelY = (_scalingAccelY) => {
			//REQUIRED: scalingAccelY

			scalingAccelY = _scalingAccelY;
		};

		let getScalingAccelY = self.getScalingAccelY = () => {
			return scalingAccelY;
		};

		// x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
		let setScalingAccel = self.setScalingAccel = (scalingAccel) => {
			//REQUIRED: scalingAccel

			scalingAccelX = scalingAccel;
			scalingAccelY = scalingAccel;
		};

		let setMinScalingSpeedX = self.setMinScalingSpeedX = (_minScalingSpeedX) => {
			//REQUIRED: minScalingSpeedX

			minScalingSpeedX = _minScalingSpeedX;
		};

		let getMinScalingSpeedX = self.getMinScalingSpeedX = () => {
			return minScalingSpeedX;
		};

		let setMinScalingSpeedY = self.setMinScalingSpeedY = (_minScalingSpeedY) => {
			//REQUIRED: minScalingSpeedY

			minScalingSpeedY = _minScalingSpeedY;
		};

		let getMinScalingSpeedY = self.getMinScalingSpeedY = () => {
			return minScalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
		let setMinScalingSpeed = self.setMinScalingSpeed = (minScalingSpeed) => {
			//REQUIRED: minScalingSpeed

			minScalingSpeedX = minScalingSpeed;
			minScalingSpeedY = minScalingSpeed;
		};

		let setMaxScalingSpeedX = self.setMaxScalingSpeedX = (_maxScalingSpeedX) => {
			//REQUIRED: maxScalingSpeedX

			maxScalingSpeedX = _maxScalingSpeedX;
		};

		let getMaxScalingSpeedX = self.getMaxScalingSpeedX = () => {
			return maxScalingSpeedX;
		};

		let setMaxScalingSpeedY = self.setMaxScalingSpeedY = (_maxScalingSpeedY) => {
			//REQUIRED: maxScalingSpeedY

			maxScalingSpeedY = _maxScalingSpeedY;
		};

		let getMaxScalingSpeedY = self.getMaxScalingSpeedY = () => {
			return maxScalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
		let setMaxScalingSpeed = self.setMaxScalingSpeed = (maxScalingSpeed) => {
			//REQUIRED: maxScalingSpeed

			maxScalingSpeedX = maxScalingSpeed;
			maxScalingSpeedY = maxScalingSpeed;
		};

		let setToScaleX = self.setToScaleX = (_toScaleX) => {
			//REQUIRED: toScaleX

			toScaleX = _toScaleX;
		};

		let getToScaleX = self.getToScaleX = () => {
			return toScaleX;
		};

		let setToScaleY = self.setToScaleY = (_toScaleY) => {
			//REQUIRED: toScaleY

			toScaleY = _toScaleY;
		};

		let getToScaleY = self.getToScaleY = () => {
			return toScaleY;
		};

		// x 스케일과 y 스케일의 목적지를 동시에 설정합니다.
		let setToScale = self.setToScale = (toScale) => {
			//REQUIRED: toScale

			toScaleX = toScale;
			toScaleY = toScale;
		};

		let setAngle = self.setAngle = (_angle) => {
			//REQUIRED: angle

			angle = _angle;

			if (targetNode === undefined) {
				realRadian = angle * Math.PI / 180;
			} else {
				realRadian = targetNode.getRealRadian() + angle * Math.PI / 180;
			}

			realSin = Math.sin(realRadian);
			realCos = Math.cos(realRadian);
		};

		let getAngle = self.getAngle = () => {
			return angle;
		};

		let setRotationSpeed = self.setRotationSpeed = (_rotationSpeed) => {
			//REQUIRED: rotationSpeed

			rotationSpeed = _rotationSpeed;
		};

		let getRotationSpeed = self.getRotationSpeed = () => {
			return rotationSpeed;
		};

		let setRotationAccel = self.setRotationAccel = (_rotationAccel) => {
			//REQUIRED: rotationAccel

			rotationAccel = _rotationAccel;
		};

		let getRotationAccel = self.getRotationAccel = () => {
			return rotationAccel;
		};

		let setMinRotationSpeed = self.setMinRotationSpeed = (_minRotationSpeed) => {
			//REQUIRED: minRotationSpeed

			minRotationSpeed = _minRotationSpeed;
		};

		let getMinRotationSpeed = self.getMinRotationSpeed = () => {
			return minRotationSpeed;
		};

		let setMaxRotationSpeed = self.setMaxRotationSpeed = (_maxRotationSpeed) => {
			//REQUIRED: maxRotationSpeed

			maxRotationSpeed = _maxRotationSpeed;
		};

		let getMaxRotationSpeed = self.getMaxRotationSpeed = () => {
			return maxRotationSpeed;
		};

		let setToAngle = self.setToAngle = (_toAngle) => {
			//REQUIRED: toAngle

			toAngle = _toAngle;
		};

		let getToAngle = self.getToAngle = () => {
			return toAngle;
		};

		let setAlpha = self.setAlpha = (_alpha) => {
			//REQUIRED: alpha

			alpha = _alpha;
		};

		let getAlpha = self.getAlpha = () => {
			return alpha;
		};

		let setFadingSpeed = self.setFadingSpeed = (_fadingSpeed) => {
			//REQUIRED: fadingSpeed

			fadingSpeed = _fadingSpeed;
		};

		let getFadingSpeed = self.getFadingSpeed = () => {
			return fadingSpeed;
		};

		let setFadingAccel = self.setFadingAccel = (_fadingAccel) => {
			//REQUIRED: fadingAccel

			fadingAccel = _fadingAccel;
		};

		let getFadingAccel = self.getFadingAccel = () => {
			return fadingAccel;
		};

		let setMinFadingSpeed = self.setMinFadingSpeed = (_minFadingSpeed) => {
			//REQUIRED: minFadingSpeed

			minFadingSpeed = _minFadingSpeed;
		};

		let getMinFadingSpeed = self.getMinFadingSpeed = () => {
			return minFadingSpeed;
		};

		let setMaxFadingSpeed = self.setMaxFadingSpeed = (_maxFadingSpeed) => {
			//REQUIRED: maxFadingSpeed

			maxFadingSpeed = _maxFadingSpeed;
		};

		let getMaxFadingSpeed = self.getMaxFadingSpeed = () => {
			return maxFadingSpeed;
		};

		let setToAlpha = self.setToAlpha = (_toAlpha) => {
			//REQUIRED: toAlpha

			toAlpha = _toAlpha;
		};

		let getToAlpha = self.getToAlpha = () => {
			return toAlpha;
		};

		let getDrawingX = self.getDrawingX = () => {
			return drawingX;
		};

		let getDrawingY = self.getDrawingY = () => {
			return drawingY;
		};

		let getRealX = self.getRealX = () => {
			return realX;
		};

		let getRealY = self.getRealY = () => {
			return realY;
		};

		let getRealScaleX = self.getRealScaleX = () => {
			return realScaleX;
		};

		let getRealScaleY = self.getRealScaleY = () => {
			return realScaleY;
		};

		let getRealRadian = self.getRealRadian = () => {
			return realRadian;
		};

		let getRealSin = self.getRealSin = () => {
			return realSin;
		};

		let getRealCos = self.getRealCos = () => {
			return realCos;
		};

		let getBeforeX = self.getBeforeX = () => {
			return beforeX;
		};

		let getBeforeY = self.getBeforeY = () => {
			return beforeY;
		};

		let genRealProperties = () => {
			setAngle(angle);
			setScaleX(scaleX);
			setScaleY(scaleY);
			genRealPosition();
		};

		// 파라미터 초기화
		if (params !== undefined) {

			x = params.x;
			y = params.y;
			centerX = params.centerX;
			centerY = params.centerY;
			z = params.z;
			if (params.scale !== undefined) {
				setScale(params.scale);
			}
			if (params.scaleX !== undefined) {
				scaleX = params.scaleX;
			}
			if (params.scaleY !== undefined) {
				scaleY = params.scaleY;
			}
			angle = params.angle;
			alpha = params.alpha;

			speedX = params.speedX;
			speedY = params.speedY;
			if (params.scalingSpeed !== undefined) {
				setScalingSpeed(params.scalingSpeed);
			}
			if (params.scalingSpeedX !== undefined) {
				scalingSpeedX = params.scalingSpeedX;
			}
			if (params.scalingSpeedY !== undefined) {
				scalingSpeedY = params.scalingSpeedY;
			}
			rotationSpeed = params.rotationSpeed;
			fadingSpeed = params.fadingSpeed;

			accelX = params.accelX;
			accelY = params.accelY;
			if (params.scalingAccel !== undefined) {
				setScalingAccel(params.scalingAccel);
			}
			if (params.scalingAccelX !== undefined) {
				scalingAccelX = params.scalingAccelX;
			}
			if (params.scalingAccelY !== undefined) {
				scalingAccelY = params.scalingAccelY;
			}
			rotationAccel = params.rotationAccel;
			fadingAccel = params.fadingAccel;

			minSpeedX = params.minSpeedX;
			minSpeedY = params.minSpeedY;
			if (params.minScaleSpeed !== undefined) {
				setMinScaleSpeed(params.minScaleSpeed);
			}
			if (params.minScaleSpeedX !== undefined) {
				minScaleSpeedX = params.minScaleSpeedX;
			}
			if (params.minScaleSpeedY !== undefined) {
				minScaleSpeedY = params.minScaleSpeedY;
			}
			minRotationSpeed = params.minRotationSpeed;
			minFadingSpeed = params.minFadingSpeed;

			maxSpeedX = params.maxSpeedX;
			maxSpeedY = params.maxSpeedY;
			if (params.maxScaleSpeed !== undefined) {
				setMaxScaleSpeed(params.maxScaleSpeed);
			}
			if (params.maxScaleSpeedX !== undefined) {
				maxScaleSpeedX = params.maxScaleSpeedX;
			}
			if (params.maxScaleSpeedY !== undefined) {
				maxScaleSpeedY = params.maxScaleSpeedY;
			}
			maxRotationSpeed = params.maxRotationSpeed;
			maxFadingSpeed = params.maxFadingSpeed;

			toX = params.toX;
			toY = params.toY;
			if (params.toScale !== undefined) {
				setToScale(params.toScale);
			}
			if (params.toScaleX !== undefined) {
				toScaleX = params.toScaleX;
			}
			if (params.toScaleY !== undefined) {
				toScaleY = params.toScaleY;
			}
			toAngle = params.toAngle;
			toAlpha = params.toAlpha;

			if (params.isHiding !== undefined) {
				isHiding = params.isHiding;
			}
			
			filter = params.filter;
			blendMode = params.blendMode;
		}

		// 초기화 되지 않은 파라미터에 기본값 지정
		if (x === undefined) {
			x = 0;
		}
		if (y === undefined) {
			y = 0;
		}
		if (centerX === undefined) {
			centerX = 0;
		}
		if (centerY === undefined) {
			centerY = 0;
		}
		if (z === undefined) {
			z = 0;
		}
		if (speedX === undefined) {
			speedX = 0;
		}
		if (speedY === undefined) {
			speedY = 0;
		}
		if (accelX === undefined) {
			accelX = 0;
		}
		if (accelY === undefined) {
			accelY = 0;
		}

		if (scaleX === undefined) {
			scaleX = 1;
		}
		if (scaleY === undefined) {
			scaleY = 1;
		}
		if (scalingSpeedX === undefined) {
			scalingSpeedX = 0;
		}
		if (scalingSpeedY === undefined) {
			scalingSpeedY = 0;
		}
		if (scalingAccelX === undefined) {
			scalingAccelX = 0;
		}
		if (scalingAccelY === undefined) {
			scalingAccelY = 0;
		}

		if (angle === undefined) {
			angle = 0;
		}
		if (rotationSpeed === undefined) {
			rotationSpeed = 0;
		}
		if (rotationAccel === undefined) {
			rotationAccel = 0;
		}

		if (alpha === undefined) {
			alpha = 1;
		}
		if (fadingSpeed === undefined) {
			fadingSpeed = 0;
		}
		if (fadingAccel === undefined) {
			fadingAccel = 0;
		}

		// 노드 등록
		if (SkyEngine.Screen !== self) {
			SkyEngine.Screen.registerNode(self);
		}

		let setFilter = self.setFilter = (_filter) => {
			//REQUIRED: filter

			filter = _filter;
		};

		let getFilter = self.getFilter = () => {
			return filter;
		};

		let removeFilter = self.removeFilter = () => {
			filter = undefined;
		};

		let setBlendMode = self.setBlendMode = (_blendMode) => {
			//REQUIRED: blendMode

			blendMode = _blendMode;
		};

		let getBlendMode = self.getBlendMode = () => {
			return blendMode;
		};

		let removeBlendMode = self.removeBlendMode = () => {
			blendMode = undefined;
		};

		let moveLeft = self.moveLeft = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedX = -speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					accelX = -speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					minSpeedX = -speedOrParams.maxSpeed;
				}
			} else {
				accelX = 0;
				speedX = minSpeedX = -speedOrParams;
			}
		};

		let stopLeft = self.stopLeft = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelX = accel;
				maxSpeedX = 0;
			} else if (speedX < 0) {
				speedX = 0;
			}
		};

		let moveRight = self.moveRight = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedX = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					accelX = speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxSpeedX = speedOrParams.maxSpeed;
				}
			} else {
				accelX = 0;
				speedX = maxSpeedX = speedOrParams;
			}
		};

		let stopRight = self.stopRight = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelX = -accel;
				minSpeedX = 0;
			} else if (speedX > 0) {
				speedX = 0;
			}
		};

		let moveUp = self.moveUp = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedY = -speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					accelY = -speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					minSpeedY = -speedOrParams.maxSpeed;
				}
			} else {
				accelY = 0;
				speedY = minSpeedY = -speedOrParams;
			}
		};

		let stopUp = self.stopUp = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelY = accel;
				maxSpeedY = 0;
			} else if (speedY < 0) {
				speedY = 0;
			}
		};

		let moveDown = self.moveDown = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedY = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					accelY = speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxSpeedY = speedOrParams.maxSpeed;
				}
			} else {
				accelY = 0;
				speedY = maxSpeedY = speedOrParams;
			}
		};

		let stopDown = self.stopDown = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelY = -accel;
				minSpeedY = 0;
			} else if (speedY > 0) {
				speedY = 0;
			}
		};

		let moveTo = self.moveTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed

			if (params.y === undefined) {
				toX = params.x;
				moveRight(params);
			} else if (params.x === undefined) {
				toY = params.y;
				moveDown(params);
			} else {
				toX = params.x;
				toY = params.y;
				
				let dx = (toX - x);
				let dy = (toY - y);

				let length = Math.sqrt(dx * dx + dy * dy);

				if (params.speed !== undefined) {
					speedX = params.speed * dx / length;
					speedY = params.speed * dy / length;
				}

				if (params.accel !== undefined) {
					accelX = params.accel * dx / length;
					accelY = params.accel * dy / length;
				}

				if (params.maxSpeed !== undefined) {
					maxSpeedX = params.maxSpeed * dx / length;
					maxSpeedY = params.maxSpeed * dy / length;
				}
			}
		};

		let stuckLeft = self.stuckLeft = () => {
			isStuckLeft = true;
		};

		let unstuckLeft = self.unstuckLeft = () => {
			isStuckLeft = false;
		};

		let stuckRight = self.stuckRight = () => {
			isStuckRight = true;
		};

		let unstuckRight = self.unstuckRight = () => {
			isStuckRight = false;
		};

		let stuckUp = self.stuckUp = () => {
			isStuckUp = true;
		};

		let unstuckUp = self.unstuckUp = () => {
			isStuckUp = false;
		};

		let stuckDown = self.stuckDown = () => {
			isStuckDown = true;
		};

		let unstuckDown = self.unstuckDown = () => {
			isStuckDown = false;
		};

		let rotate = self.rotate = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.minSpeed
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					rotationSpeed = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					rotationAccel = speedOrParams.accel;
				}

				if (speedOrParams.minSpeed !== undefined) {
					minRotationSpeed = speedOrParams.minSpeed;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxRotationSpeed = speedOrParams.maxSpeed;
				}
			} else {
				rotationSpeed = speedOrParams;
			}
		};

		let stopRotation = self.stopRotation = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				rotationAccel = -accel;
				if (accel > 0) {
					minRotationSpeed = 0;
				} else if (accel < 0) {
					maxRotationSpeed = 0;
				}
			} else if (rotationSpeed > 0) {
				rotationSpeed = 0;
			}
		};

		let rotateTo = self.rotateTo = (params) => {
			//REQUIRED: params
			//REQUIRED: params.toAngle
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed

			toAngle = params.toAngle;

			if (params.speed !== undefined) {
				rotationSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				rotationAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minRotationSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxRotationSpeed = params.maxSpeed;
			}
		};

		let flipX = self.flipX = () => {
			scaleX = -scaleX;
		};

		let flipY = self.flipY = () => {
			scaleY = -scaleY;
		};

		let fadeIn = self.fadeIn = (speedOrParams, fadeEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = speedOrParams.speed;
					
					if (fadeEndHandler !== undefined) {
						
						DELAY(1 / Math.abs(fadingSpeed), () => {
							fadeEndHandler(self);
						});
					}
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxFadingSpeed = speedOrParams.maxSpeed;
				}
			} else {
				fadingSpeed = speedOrParams;
				
				if (fadeEndHandler !== undefined) {
					
					DELAY(1 / Math.abs(fadingSpeed), () => {
						fadeEndHandler(self);
					});
				}
			}
		};

		let fadeOut = self.fadeOut = (speedOrParams, fadeEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = -speedOrParams.speed;
					
					if (fadeEndHandler !== undefined) {
						
						DELAY(1 / Math.abs(fadingSpeed), () => {
							fadeEndHandler(self);
						});
					}
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = -speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					minFadingSpeed = -speedOrParams.maxSpeed;
				}
			} else {
				fadingSpeed = -speedOrParams;
				
				if (fadeEndHandler !== undefined) {
					
					DELAY(1 / Math.abs(fadingSpeed), () => {
						fadeEndHandler(self);
					});
				}
			}
		};

		let stopFading = self.stopFading = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				fadingAccel = -accel;
				if (accel > 0) {
					minFadingSpeed = 0;
				} else if (accel < 0) {
					maxFadingSpeed = 0;
				}
			} else if (fadingSpeed > 0) {
				fadingSpeed = 0;
			}
		};

		let fadeTo = self.fadeTo = (params) => {
			//REQUIRED: params
			//REQUIRED: params.toAlpha
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed

			toAlpha = params.toAlpha;

			if (params.speed !== undefined) {
				fadingSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				fadingAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minFadingSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxFadingSpeed = params.maxSpeed;
			}
		};

		let hide = self.hide = () => {
			isHiding = true;
		};

		let show = self.show = () => {
			isHiding = false;
		};

		let checkIsHiding = self.checkIsHiding = () => {
			return isHiding;
		};

		let getChildren = self.getChildren = () => {
			return childNodes;
		};

		let getParent = self.getParent = () => {
			return parentNode;
		};

		let setTarget = self.setTarget = (_targetNode) => {
			targetNode = _targetNode;

			if (targetNode !== undefined) {

				genRealProperties();

				// 모든 터치 영역에 대해 실행
				self.getTouchAreas().forEach((touchArea) => {
					touchArea.setTarget(self);
				});

				// 모든 충돌 영역에 대해 실행
				self.getColliders().forEach((collider) => {
					collider.setTarget(self);
				});

				// 모든 자식 노드들에 대해 실행
				self.getChildren().forEach((childNode) => {
					childNode.setTarget(self);
				});
			}
		};

		let setParent = self.setParent = (_parentNode) => {
			parentNode = _parentNode;
			setTarget(parentNode);
		};

		let appendToParent = () => {

			let parentChildren = parentNode.getChildren();

			let low = 0;
			let high = parentChildren.length;

			while (low < high) {

				// >>> 1은 2로 나누고 나머지를 버리는 것과 동일
				let mid = (low + high) >>> 1;

				if (parentChildren[mid].getZ() <= z) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}

			parentChildren.splice(low, 0, self);
		};

		let removeFromParent = () => {

			let parentChildren = parentNode.getChildren();

			let minIndex = 0;
			let maxIndex = parentChildren.length - 1;

			let level = 0;

			while (minIndex <= maxIndex) {

				let index = Math.ceil((minIndex + maxIndex) / 2);

				let node = parentChildren[index];

				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				} else {

					while (true) {

						if (parentChildren[index - level] === self) {
							parentChildren.splice(index - level, 1);
							break;
						}

						if (level > 0 && parentChildren[index + level] === self) {
							parentChildren.splice(index + level, 1);
							break;
						}

						if (
							parentChildren[index - level].getZ() !== z &&
							parentChildren[index + level].getZ() !== z) {
							break;
						}

						level += 1;
					}

					break;
				}
			}
		};

		let appendTo = self.appendTo = (node) => {
			//REQUIRED: node

			if (parentNode !== undefined) {
				removeFromParent();
			}

			setParent(node);

			appendToParent();

			return self;
		};

		let append = self.append = (node) => {
			//REQUIRED: node

			node.appendTo(self);
		};
		
		let addDom = self.addDom = (dom) => {
			//REQUIRED: dom
			
			if (domWrapper === undefined) {
				
				domWrapper = DIV({
					style : {
						position : 'fixed'
					}
				}).appendTo(BODY);
			}
			
			domWrapper.append(dom);
		};
		
		let empty = self.empty = () => {
			
			childNodes.forEach((childNode) => {
				childNode.setParent(undefined);
				childNode.remove();
			});
			childNodes = [];
		};

		let remove = self.remove = () => {

			empty();
			
			childNodes = undefined;

			if (parentNode !== undefined) {
				removeFromParent();
				setParent(undefined);
			}

			if (SkyEngine.Screen !== self) {
				SkyEngine.Screen.unregisterNode(self);
			}

			// 모든 이벤트 제거
			EACH(eventMap, (events, eventName) => {
				SkyEngine.Screen.unregisterEventNode(eventName, self);
			});
			eventMap = undefined;

			// 모든 터치 영역 제거
			touchAreas.forEach((touchArea) => {
				touchArea.remove();
			});
			touchAreas = undefined;

			// 모든 충돌 영역 제거
			colliders.forEach((collider) => {
				collider.remove();
			});
			colliders = undefined;

			collisionTargets = undefined
			collidingNodeIds = undefined;
			meetHandlerMap = undefined;
			partHandlerMap = undefined;
			
			if (domWrapper !== undefined) {
				domWrapper.remove();
			}

			isRemoved = true;
		};

		let checkIsRemoved = self.checkIsRemoved = () => {
			return isRemoved;
		};

		let on = self.on = (eventName, eventHandler) => {

			if (eventMap[eventName] === undefined) {
				eventMap[eventName] = [];

				SkyEngine.Screen.registerEventNode(eventName, self);
			}

			eventMap[eventName].push(eventHandler);
		};

		let off = self.off = (eventName, eventHandler) => {

			if (isRemoved !== true && eventMap[eventName] !== undefined) {

				if (eventHandler !== undefined) {

					REMOVE({
						array: eventMap[eventName],
						value: eventHandler
					});
				}

				if (eventHandler === undefined || eventMap[eventName].length === 0) {
					delete eventMap[eventName];

					SkyEngine.Screen.unregisterEventNode(eventName, self);
				}
			}
		};

		let fireEvent = self.fireEvent = (eventNameOrParams) => {
			//REQUIRED: eventNameOrParams
			//REQUIRED: eventNameOrParams.eventName
			//OPTIONAL: eventNameOrParams.e
			
			let eventName;
			let e;
			
			if (CHECK_IS_DATA(eventNameOrParams) !== true) {
				eventName = eventNameOrParams;
			} else {
				eventName = eventNameOrParams.eventName;
				e = eventNameOrParams.e;
			}

			if (eventMap[eventName] !== undefined) {

				eventMap[eventName].forEach((eventHandler) => {
					eventHandler(e === undefined ? EMPTY_E() : e, self);
				});
			}
		};

		let onMeet = self.onMeet = (target, handler) => {

			collisionTargets.push(target);

			if (meetHandlerMap[target.id] === undefined) {
				meetHandlerMap[target.id] = [];
			}

			meetHandlerMap[target.id].push(handler);

			checkAllCollisions();
		};

		let offMeet = self.offMeet = (target, handler) => {

			if (handler === undefined) {
				delete meetHandlerMap[target.id];
			} else {
				REMOVE({
					array: meetHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runMeetHandlers = self.runMeetHandlers = (target, realTarget) => {

			if (meetHandlerMap[target.id] !== undefined) {

				meetHandlerMap[target.id].forEach((handler) => {
					handler(realTarget);
				});
			}
		};

		let onPart = self.onPart = (target, handler) => {

			collisionTargets.push(target);

			if (partHandlerMap[target.id] === undefined) {
				partHandlerMap[target.id] = [];
			}

			partHandlerMap[target.id].push(handler);
		};

		let offPart = self.offPart = (target, handler) => {

			if (handler === undefined) {
				delete partHandlerMap[target.id];
			} else {
				REMOVE({
					array: partHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runPartHandlers = self.runPartHandlers = (target, realTarget) => {

			if (partHandlerMap[target.id] !== undefined) {

				partHandlerMap[target.id].forEach((handler) => {
					handler(realTarget);
				});
			}
		};

		let addTouchArea = self.addTouchArea = (touchArea) => {
			//REQUIRED: touchArea

			touchAreas.push(touchArea);
			touchArea.setTarget(self);
		};

		let getTouchAreas = self.getTouchAreas = () => {
			return touchAreas;
		};

		let getTouchArea = self.getTouchArea = () => {
			return touchAreas[0];
		};

		let addCollider = self.addCollider = (collider) => {
			//REQUIRED: collider

			colliders.push(collider);
			collider.setTarget(self);
		};

		let getColliders = self.getColliders = () => {
			return colliders;
		};

		let getCollider = self.getCollider = () => {
			return colliders[0];
		};

		let checkPoint = self.checkPoint = (pointX, pointY) => {

			return childNodes.every((childNode) => {
				return childNode.checkPoint(pointX, pointY) !== true;
			}) !== true;
		};

		let checkArea = self.checkArea = (area) => {

			return childNodes.every((childNode) => {
				return childNode.checkArea(area) !== true && area.checkArea(childNode) !== true;
			}) !== true;
		};

		let checkTouch = self.checkTouch = (touchX, touchY) => {

			if (self.checkIsHiding() === true) {
				return false;
			}

			return touchAreas.every((touchArea) => {
					return touchArea.checkPoint(touchX, touchY) !== true;
				}) !== true ||

				childNodes.every((childNode) => {
					return childNode.checkTouch(touchX, touchY) !== true;
				}) !== true;
		};

		let checkCollision = self.checkCollision = (target) => {

			if (isRemoved === true || self.checkIsHiding() === true) {
				return false;
			} else if (target.type === CLASS) {

				return SkyEngine.Screen.getRegisteredNodes(target).every((realTarget) => {
					if (realTarget !== self) {
						return self.checkCollision(realTarget) !== true;
					}
				}) !== true;
			} else {

				if (target.checkIsHiding() === true) {
					return false;
				}

				return colliders.every((collider) => {
						return target.checkIsRemoved() !== true && target.getColliders().every((targetCollider) => {
							return collider.checkArea(targetCollider) !== true;
						});
					}) !== true ||

					childNodes.every((childNode) => {
						return childNode.checkCollision(target) !== true;
					}) !== true;
			}
		};

		let checkOffScreen = self.checkOffScreen = () => {

			return childNodes.every((childNode) => {
				return childNode.checkOffScreen(target) === true;
			}) === true;
		};

		let checkAllCollisions = () => {

			collisionTargets.forEach((target, index, arr) => {

				if (target.type === CLASS) {

					SkyEngine.Screen.getRegisteredNodes(target).forEach((realTarget) => {

						if (realTarget !== self) {

							if (realTarget.checkIsRemoved() !== true) {

								if (self.checkCollision(realTarget) === true || (self.type !== realTarget.type && realTarget.checkCollision(self) === true)) {

									if (isRemoved !== true && collidingNodeIds[realTarget.id] === undefined) {
										collidingNodeIds[realTarget.id] = true;

										runMeetHandlers(target, realTarget);
									}
								} else if (isRemoved !== true && collidingNodeIds[realTarget.id] !== undefined) {
									delete collidingNodeIds[realTarget.id];

									runPartHandlers(target, realTarget);
								}
							} else {
								delete collidingNodeIds[realTarget.id];
							}
						}
					});
				} else if (target.checkIsRemoved() !== true) {

					if (self.checkCollision(target) === true || (self.type !== target.type && target.checkCollision(self) === true)) {

						if (collidingNodeIds[target.id] === undefined) {
							collidingNodeIds[target.id] = true;

							runMeetHandlers(target, target);
						}
					} else if (collidingNodeIds[target.id] !== undefined) {
						delete collidingNodeIds[target.id];

						runPartHandlers(target, target);
					}
				} else {

					arr.splice(index, 1);

					delete collidingNodeIds[target.id];
					delete meetHandlerMap[target.id];
					delete partHandlerMap[target.id];
				}
			});
		};

		let step = self.step = (deltaTime) => {

			beforeX = x;
			beforeY = y;

			if (accelX !== 0) {
				speedX += accelX * deltaTime;
			}

			if (minSpeedX !== undefined && speedX < minSpeedX) {
				speedX = minSpeedX;
			}

			if (maxSpeedX !== undefined && speedX > maxSpeedX) {
				speedX = maxSpeedX;
			}

			if (accelY !== 0) {
				speedY += accelY * deltaTime;
			}

			if (minSpeedY !== undefined && speedY < minSpeedY) {
				speedY = minSpeedY;
			}

			if (maxSpeedY !== undefined && speedY > maxSpeedY) {
				speedY = maxSpeedY;
			}

			if (speedX !== 0) {

				let dx = speedX * deltaTime;

				if ((dx < 0 && isStuckLeft !== true) || (dx > 0 && isStuckRight !== true)) {

					x += dx;

					if (toX !== undefined) {

						if ((speedX > 0 && x > toX) || (speedX < 0 && x < toX)) {
							x = toX;
							speedX = 0;
						}
					}
				}
			}

			if (speedY !== 0) {

				let dy = speedY * deltaTime;

				if ((dy < 0 && isStuckUp !== true) || (dy > 0 && isStuckDown !== true)) {

					y += dy;

					if (toY !== undefined) {

						if ((speedY > 0 && y > toY) || (speedY < 0 && y < toY)) {
							y = toY;
							speedY = 0;
						}
					}
				}
			}

			if (scalingAccelX !== 0) {
				scalingSpeedX += scalingAccelX * deltaTime;
			}

			if (minScalingSpeedX !== undefined && scalingSpeedX < minScalingSpeedX) {
				scalingSpeedX = minScalingSpeedX;
			}

			if (maxScalingSpeedX !== undefined && scalingSpeedX > maxScalingSpeedX) {
				scalingSpeedX = maxScalingSpeedX;
			}

			if (scalingAccelY !== 0) {
				scalingSpeedY += scalingAccelY * deltaTime;
			}

			if (minScalingSpeedY !== undefined && scalingSpeedY < minScalingSpeedY) {
				scalingSpeedY = minScalingSpeedY;
			}

			if (maxScalingSpeedY !== undefined && scalingSpeedY > maxScalingSpeedY) {
				scalingSpeedY = maxScalingSpeedY;
			}

			if (scalingSpeedX !== 0) {
				scaleX += scalingSpeedX * deltaTime;

				if (toScaleX !== undefined) {

					if ((scalingSpeedX > 0 && scaleX > toScaleX) || (scalingSpeedX < 0 && scaleX < toScaleX)) {
						scaleX = toScaleX;
						scalingSpeedX = 0;
					}
				}
			}

			if (scalingSpeedY !== 0) {
				scaleY += scalingSpeedY * deltaTime;

				if (toScaleY !== undefined) {

					if ((scalingSpeedY > 0 && scaleY > toScaleY) || (scalingSpeedY < 0 && scaleY < toScaleY)) {
						scaleY = toScaleY;
						scalingSpeedY = 0;
					}
				}
			}

			if (rotationAccel !== 0) {
				rotationSpeed += rotationAccel * deltaTime;
			}

			if (minRotationSpeed !== undefined && rotationSpeed < minRotationSpeed) {
				rotationSpeed = minRotationSpeed;
			}

			if (maxRotationSpeed !== undefined && rotationSpeed > maxRotationSpeed) {
				rotationSpeed = maxRotationSpeed;
			}

			if (rotationSpeed !== 0) {
				angle += rotationSpeed * deltaTime;

				if (toAngle !== undefined) {

					if ((rotationSpeed > 0 && angle >= toAngle) || (rotationSpeed < 0 && angle <= toAngle)) {
						angle = toAngle;
						rotationSpeed = 0;
					}
				}

				if (angle >= 360) {
					angle = 0;
				} else if (angle <= 0) {
					angle = 360;
				}
			}

			if (fadingAccel !== 0) {
				fadingSpeed += fadingAccel * deltaTime;
			}

			if (minFadingSpeed !== undefined && fadingSpeed < minFadingSpeed) {
				fadingSpeed = minFadingSpeed;
			}

			if (maxFadingSpeed !== undefined && fadingSpeed > maxFadingSpeed) {
				fadingSpeed = maxFadingSpeed;
			}

			if (fadingSpeed !== 0) {
				alpha += fadingSpeed * deltaTime;

				if (toAlpha !== undefined) {

					if ((fadingSpeed > 0 && alpha > toAlpha) || (fadingSpeed < 0 && alpha < toAlpha)) {
						alpha = toAlpha;
						fadingSpeed = 0;
					}
				}

				if (alpha > 1) {
					alpha = 1;
				} else if (alpha < 0) {
					alpha = 0;
				}
			}

			genRealProperties();

			// 모든 터치 영역에 대해 실행
			if (isRemoved !== true) {
				
				touchAreas.forEach((touchArea) => {
					touchArea.step(deltaTime);
				});
			}

			// 모든 충돌 영역에 대해 실행
			if (isRemoved !== true) {
				
				colliders.forEach((collider) => {
					collider.step(deltaTime);
				});
			}
			
			if (isRemoved !== true) {
				
				// 충돌 체크
				checkAllCollisions();
			}

			// 모든 자식 노드들에 대해 실행
			if (isRemoved !== true) {
				childNodes.forEach((childNode) => {
					childNode.step(deltaTime);
				});
			}

			if (isRemoved !== true && eventMap.offscreen !== undefined && self.checkOffScreen() === true) {
				fireEvent('offscreen');
			}

			if (isRemoved !== true && eventMap.nextstep !== undefined) {
				fireEvent('nextstep');
				off('nextstep');
			}

			if (isRemoved !== true && eventMap.move !== undefined && (x !== beforeX || y !== beforeY)) {
				fireEvent('move');
			}
		};

		let draw = self.draw = (context) => {
			// to implement.
			
			if (domWrapper !== undefined) {
				
				domWrapper.addStyle({
					left : SkyEngine.Screen.getWidth() / 2 + drawingX - domWrapper.getWidth() / 2,
					top : SkyEngine.Screen.getHeight() / 2 + drawingY - domWrapper.getHeight() / 2,
					transform : 'rotate(' + realRadian + 'rad) scale(' + realScaleX + ', ' + realScaleY + ')',
					opacity : context.globalAlpha,
					filter : context.filter
				});
			}
		};

		let drawArea = self.drawArea = (context) => {
			// to implement.
		};

		let clone = self.clone = (appendParams) => {
			//OPTIONAL: appendParams
			//OPTIONAL: appendParams.exceptChildNodes

			let newParams = {
				x: x,
				y: y,
				centerX: centerX,
				centerY: centerY,
				z: z,
				speedX: speedX,
				speedY: speedY,
				accelX: accelX,
				accelY: accelY,
				minSpeedX: minSpeedX,
				minSpeedY: minSpeedY,
				maxSpeedX: maxSpeedX,
				maxSpeedY: maxSpeedY,
				toX: toX,
				toY: toY,

				scaleX: scaleX,
				scaleY: scaleY,
				scalingSpeedX: scalingSpeedX,
				scalingSpeedY: scalingSpeedY,
				scalingAccelX: scalingAccelX,
				scalingAccelY: scalingAccelY,
				minScalingSpeedX: minScalingSpeedX,
				minScalingSpeedY: minScalingSpeedY,
				maxScalingSpeedX: maxScalingSpeedX,
				maxScalingSpeedY: maxScalingSpeedY,
				toScaleX: toScaleX,
				toScaleY: toScaleY,

				angle: angle,
				rotationSpeed: rotationSpeed,
				rotationAccel: rotationAccel,
				minRotationSpeed: minRotationSpeed,
				maxRotationSpeed: maxRotationSpeed,
				toAngle: toAngle,

				alpha: alpha,
				fadingSpeed: fadingSpeed,
				fadingAccel: fadingAccel,
				minFadingSpeed: minFadingSpeed,
				maxFadingSpeed: maxFadingSpeed,
				toAlpha: toAlpha
			};

			let exceptChildNodes;

			if (appendParams !== undefined) {

				if (appendParams.exceptChildNodes !== undefined) {
					exceptChildNodes = appendParams.exceptChildNodes;
					delete appendParams.exceptChildNodes;
				}

				EXTEND({
					origin: newParams,
					extend: appendParams
				});
			}

			let clone = self.type(newParams);

			EACH(colliders, (collider) => {
				clone.addCollider(collider.clone());
			});

			EACH(touchAreas, (touchArea) => {
				clone.addTouchArea(touchArea.clone());
			});

			EACH(childNodes, (childNode) => {
				if (exceptChildNodes === undefined || CHECK_IS_IN({
						array: exceptChildNodes,
						value: childNode
					}) !== true) {
					clone.append(childNode.clone());
				}
			});

			EACH(eventMap, (events, eventName) => {
				EACH(events, (eventHandler) => {
					clone.on(eventName, eventHandler);
				});
			});

			EACH(collisionTargets, (collisionTarget) => {

				if (meetHandlerMap[target.id] !== undefined) {
					EACH(meetHandlerMap[target.id], (meetHandler) => {
						clone.onMeet(collisionTarget, meetHandler);
					});
				}

				if (partHandlerMap[target.id] !== undefined) {
					EACH(partHandlerMap[target.id], (partHandler) => {
						clone.onPart(collisionTarget, partHandler);
					});
				}
			});

			if (filter !== undefined) {
				clone.setFilter(filter);
			}

			if (blendMode !== undefined) {
				clone.setBlendMode(blendMode);
			}

			if (isHiding === true) {
				clone.hide();
			}

			return clone;
		};

		genRealProperties();
	},

	afterInit: (inner, self, params) => {

		if (params !== undefined) {

			if (params.c !== undefined) {
				if (CHECK_IS_ARRAY(params.c) === true) {
					EACH(params.c, (childNode) => {
						self.append(childNode);
					});
				} else {
					self.append(params.c);
				}
			}

			if (params.dom !== undefined) {
				if (CHECK_IS_ARRAY(params.dom) === true) {
					EACH(params.dom, (childNode) => {
						self.addDom(childNode);
					});
				} else {
					self.addDom(params.dom);
				}
			}

			if (params.on !== undefined) {
				EACH(params.on, (eventHandler, eventName) => {
					self.on(eventName, eventHandler);
				});
			}

			if (params.touchArea !== undefined) {
				if (CHECK_IS_ARRAY(params.touchArea) === true) {
					EACH(params.touchArea, (touchArea) => {
						self.addTouchArea(touchArea);
					});
				} else {
					self.addTouchArea(params.touchArea);
				}
			}

			if (params.collider !== undefined) {
				if (CHECK_IS_ARRAY(params.collider) === true) {
					EACH(params.collider, (collider) => {
						self.addCollider(collider);
					});
				} else {
					self.addCollider(params.collider);
				}
			}
		}
	}
});