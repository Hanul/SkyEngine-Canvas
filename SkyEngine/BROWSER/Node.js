/*
 * 노드 트리를 구성하기 위한 노드 클래스
 */
SkyEngine.Node = CLASS({

	init : (inner, self, params) => {
		//OPTIONAL: params
		
		//OPTIONAL: params.x					x 좌표
		//OPTIONAL: params.y					y 좌표
		//OPTIONAL: params.centerX				중점의 x 좌표
		//OPTIONAL: params.centerY				중점의 y 좌표
		//OPTIONAL: params.z					노드의 드로우 순서를 결정하기 위한 z 인덱스
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
		
		//OPTIONAL: params.scale				배율
		//OPTIONAL: params.scaleX				x 배율
		//OPTIONAL: params.scaleY				y 배율
		//OPTIONAL: params.scalingSpeed			배율이 커지는 속도
		//OPTIONAL: params.scalingSpeedX		x 배율이 커지는 속도
		//OPTIONAL: params.scalingSpeedY		y 배율이 커지는 속도
		//OPTIONAL: params.scalingAccel			배율이 커지는 가속도
		//OPTIONAL: params.scalingAccelX		x 배율이 커지는 가속도
		//OPTIONAL: params.scalingAccelY		y 배율이 커지는 가속도
		//OPTIONAL: params.minScalingSpeed		배율이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedX		x 배율이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedY		y 배율이 커지는 최소 속도
		//OPTIONAL: params.maxScalingSpeed		배율이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedX		x 배율이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedY		y 배율이 커지는 최대 속도
		//OPTIONAL: params.toScale				배율이 커지는 목적지
		//OPTIONAL: params.toScaleX				x 배율이 커지는 목적지
		//OPTIONAL: params.toScaleY				y 배율이 커지는 목적지
		
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
		
		//OPTIONAL: params.collider				충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.touchArea			터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.c					자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on					이벤트
		
		// properties
		let x, y, centerX, centerY, z, scaleX, scaleY, angle, alpha;
		let speedX, speedY, scalingSpeedX, scalingSpeedY, rotationSpeed, fadingSpeed;
		let accelX, accelY, scalingAccelX, scalingAccelY, rotationAccel, fadingAccel;
		
		// min, max speed (undefined면 무제한)
		let minSpeedX, minSpeedY, minScalingSpeedX, minScalingSpeedY, minRotationSpeed, minFadingSpeed;
		let maxSpeedX, maxSpeedY, maxScalingSpeedX, maxScalingSpeedY, maxRotationSpeed, maxFadingSpeed;
		
		// to properties
		let toX, toY, toScaleX, toScaleY, toAngle, toAlpha;
		
		// real properties
		let realX, realY, realScaleX, realScaleY, realRadian, realAlpha;
		
		let parentNode;
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
		
		// for position
		let setX = self.setX = (_x) =>							{ x = _x; };
		let getX = self.getX = () =>							{ return x; };
		let setY = self.setY = (_y) =>							{ y = _y; };
		let getY = self.getY = () =>							{ return y; };
		let setCenterX = self.setCenterX = (_centerX) =>		{ centerX = _centerX; };
		let getCenterX = self.getCenterX = () =>				{ return centerX; };
		let setCenterY = self.setCenterY = (_centerY) =>		{ centerY = _centerY; };
		let getCenterY = self.getCenterY = () =>				{ return centerY; };
		let setZ = self.setZ = (_z) =>	{
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		let getZ = self.getZ = () =>							{ return z; };
		let setSpeedX = self.setSpeedX = (_speedX) =>			{ speedX = _speedX; };
		let getSpeedX = self.getSpeedX = () =>					{ return speedX; };
		let setSpeedY = self.setSpeedY = (_speedY) =>			{ speedY = _speedY; };
		let getSpeedY = self.getSpeedY = () =>					{ return speedY; };
		let setAccelX = self.setAccelX = (_accelX) =>			{ accelX = _accelX; };
		let getAccelX = self.getAccelX = () =>					{ return accelX; };
		let setAccelY = self.setAccelY = (_accelY) =>			{ accelY = _accelY; };
		let getAccelY = self.getAccelY = () =>					{ return accelY; };
		let setMinSpeedX = self.setMinSpeedX = (_minSpeedX) =>	{ minSpeedX = _minSpeedX; };
		let getMinSpeedX = self.getMinSpeedX = () =>			{ return minSpeedX; };
		let setMinSpeedY = self.setMinSpeedY = (_minSpeedY) =>	{ minSpeedY = _minSpeedY; };
		let getMinSpeedY = self.getMinSpeedY = () =>			{ return minSpeedY; };
		let setMaxSpeedX = self.setMaxSpeedX = (_maxSpeedX) =>	{ maxSpeedX = _maxSpeedX; };
		let getMaxSpeedX = self.getMaxSpeedX = () =>			{ return maxSpeedX; };
		let setMaxSpeedY = self.setMaxSpeedY = (_maxSpeedY) =>	{ maxSpeedY = _maxSpeedY; };
		let getMaxSpeedY = self.getMaxSpeedY = () =>			{ return maxSpeedY; };
		let setToX = self.setToX = (_toX) =>					{ toX = _toX; };
		let getToX = self.getToX = () =>						{ return toX; };
		let setToY = self.setToY = (_toY) =>					{ toY = _toY; };
		let getToY = self.getToY = () =>						{ return toY; };
		
		// for scale
		let setScaleX = self.setScaleX = (_scaleX) =>									{ scaleX = _scaleX; };
		let getScaleX = self.getScaleX = () =>											{ return scaleX; };
		let setScaleY = self.setScaleY = (_scaleY) =>									{ scaleY = _scaleY; };
		let getScaleY = self.getScaleY = () =>											{ return scaleY; };
		let setScale = self.setScale = (scale) => {
			scaleX = scale;
			scaleY = scale;
		};
		let setScalingSpeedX = self.setScalingSpeedX = (_scalingSpeedX) =>				{ scalingSpeedX = _scalingSpeedX; };
		let getScalingSpeedX = self.getScalingSpeedX = () =>							{ return scalingSpeedX; };
		let setScalingSpeedY = self.setScalingSpeedY = (_scalingSpeedY) =>				{ scalingSpeedY = _scalingSpeedY; };
		let getScalingSpeedY = self.getScalingSpeedY = () =>							{ return scalingSpeedY; };
		let setScalingSpeed = self.setScalingSpeed = (scalingSpeed) => {
			scalingSpeedX = scalingSpeed;
			scalingSpeedY = scalingSpeed;
		};
		let setScalingAccelX = self.setScalingAccelX = (_scalingAccelX) =>				{ scalingAccelX = _scalingAccelX; };
		let getScalingAccelX = self.getScalingAccelX = () =>							{ return scalingAccelX; };
		let setScalingAccelY = self.setScalingAccelY = (_scalingAccelY) =>				{ scalingAccelY = _scalingAccelY; };
		let getScalingAccelY = self.getScalingAccelY = () =>							{ return scalingAccelY; };
		let setScalingAccel = self.setScalingAccel = (scalingAccel) => {
			scalingAccelX = scalingAccel;
			scalingAccelY = scalingAccel;
		};
		let setMinScalingSpeedX = self.setMinScalingSpeedX = (_minScalingSpeedX) =>		{ minScalingSpeedX = _minScalingSpeedX; };
		let getMinScalingSpeedX = self.getMinScalingSpeedX = () =>						{ return minScalingSpeedX; };
		let setMinScalingSpeedY = self.setMinScalingSpeedY = (_minScalingSpeedY) =>		{ minScalingSpeedY = _minScalingSpeedY; };
		let getMinScalingSpeedY = self.getMinScalingSpeedY = () =>						{ return minScalingSpeedY; };
		let setMinScalingSpeed = self.setMinScalingSpeed = (minScalingSpeed) => {
			minScalingSpeedX = minScalingSpeed;
			minScalingSpeedY = minScalingSpeed;
		};
		let setMaxScalingSpeedX = self.setMaxScalingSpeedX = (_maxScalingSpeedX) =>		{ maxScalingSpeedX = _maxScalingSpeedX; };
		let getMaxScalingSpeedX = self.getMaxScalingSpeedX = () =>						{ return maxScalingSpeedX; };
		let setMaxScalingSpeedY = self.setMaxScalingSpeedY = (_maxScalingSpeedY) =>		{ maxScalingSpeedY = _maxScalingSpeedY; };
		let getMaxScalingSpeedY = self.getMaxScalingSpeedY = () =>						{ return maxScalingSpeedY; };
		let setMaxScalingSpeed = self.setMaxScalingSpeed = (maxScalingSpeed) => {
			maxScalingSpeedX = maxScalingSpeed;
			maxScalingSpeedY = maxScalingSpeed;
		};
		let setToScaleX = self.setToScaleX = (_toScaleX) =>								{ toScaleX = _toScaleX; };
		let getToScaleX = self.getToScaleX = () =>										{ return toScaleX; };
		let setToScaleY = self.setToScaleY = (_toScaleY) =>								{ toScaleY = _toScaleY; };
		let getToScaleY = self.getToScaleY = () =>										{ return toScaleY; };
		let setToScale = self.setToScale = (toScale) => {
			toScaleX = toScale;
			toScaleY = toScale;
		};
		
		// for angle
		let setAngle = self.setAngle = (_angle) =>										{ angle = _angle; };
		let getAngle = self.getAngle = () =>											{ return angle; };
		let setRotationSpeed = self.setRotationSpeed = (_rotationSpeed) =>				{ rotationSpeed = _rotationSpeed; };
		let getRotationSpeed = self.getRotationSpeed = () =>							{ return rotationSpeed; };
		let setRotationAccel = self.setRotationAccel = (_rotationAccel) =>				{ rotationAccel = _rotationAccel; };
		let getRotationAccel = self.getRotationAccel = () =>							{ return rotationAccel; };
		let setMinRotationSpeed = self.setMinRotationSpeed = (_minRotationSpeed) =>		{ minRotationSpeed = _minRotationSpeed; };
		let getMinRotationSpeed = self.getMinRotationSpeed = () =>						{ return minRotationSpeed; };
		let setMaxRotationSpeed = self.setMaxRotationSpeed = (_maxRotationSpeed) =>		{ maxRotationSpeed = _maxRotationSpeed; };
		let getMaxRotationSpeed = self.getMaxRotationSpeed = () =>						{ return maxRotationSpeed; };
		let setToAngle = self.setToAngle = (_toAngle) =>								{ toAngle = _toAngle; };
		let getToAngle = self.getToAngle = () =>										{ return toAngle; };
		
		// for alpha
		let setAlpha = self.setAlpha = (_alpha) =>								{ alpha = _alpha; };
		let getAlpha = self.getAlpha = () =>									{ return alpha; };
		let setFadingSpeed = self.setFadingSpeed = (_fadingSpeed) =>			{ fadingSpeed = _fadingSpeed; };
		let getFadingSpeed = self.getFadingSpeed = () =>						{ return fadingSpeed; };
		let setFadingAccel = self.setFadingAccel = (_fadingAccel) =>			{ fadingAccel = _fadingAccel; };
		let getFadingAccel = self.getFadingAccel = () =>						{ return fadingAccel; };
		let setMinFadingSpeed = self.setMinFadingSpeed = (_minFadingSpeed) =>	{ minFadingSpeed = _minFadingSpeed; };
		let getMinFadingSpeed = self.getMinFadingSpeed = () =>					{ return minFadingSpeed; };
		let setMaxFadingSpeed = self.setMaxFadingSpeed = (_maxFadingSpeed) =>	{ maxFadingSpeed = _maxFadingSpeed; };
		let getMaxFadingSpeed = self.getMaxFadingSpeed = () =>					{ return maxFadingSpeed; };
		let setToAlpha = self.setToAlpha = (_toAlpha) =>						{ toAlpha = _toAlpha; };
		let getToAlpha = self.getToAlpha = () =>								{ return toAlpha; };
		
		// for real properties
		let getRealX = self.getRealX = () =>									{ return realX; };
		let getRealY = self.getRealY = () =>									{ return realY; };
		let getRealScaleX = self.getRealScaleX = () =>							{ return realScaleX; };
		let getRealScaleY = self.getRealScaleY = () =>							{ return realScaleY; };
		let getRealRadian = self.getRealRadian = (_toAlpha) =>					{ return realRadian; };
		let getRealAlpha = self.getRealAlpha = (_toAlpha) =>					{ return realAlpha; };
		
		// 파라미터 초기화
		if (params !== undefined) {
			
			x = params.x;
			y = params.y;
			centerX = params.centerX;
			centerY = params.centerY;
			z = params.z;
			if (params.scale !== undefined)		{ setScale(params.scale); }
			if (params.scaleX !== undefined)	{ scaleX = params.scaleX; }
			if (params.scaleY !== undefined)	{ scaleY = params.scaleY; }
			angle = params.angle;
			alpha = params.alpha;
			
			speedX = params.speedX;
			speedY = params.speedY;
			if (params.scalingSpeed !== undefined)	{ setScalingSpeed(params.scalingSpeed); }
			if (params.scalingSpeedX !== undefined)	{ scalingSpeedX = params.scalingSpeedX; }
			if (params.scalingSpeedY !== undefined)	{ scalingSpeedY = params.scalingSpeedY; }
			rotationSpeed = params.rotationSpeed;
			fadingSpeed = params.fadingSpeed;
			
			accelX = params.accelX;
			accelY = params.accelY;
			if (params.scalingAccel !== undefined)	{ setScalingAccel(params.scalingAccel); }
			if (params.scalingAccelX !== undefined)	{ scalingAccelX = params.scalingAccelX; }
			if (params.scalingAccelY !== undefined)	{ scalingAccelY = params.scalingAccelY; }
			rotationAccel = params.rotationAccel;
			fadingAccel = params.fadingAccel;
			
			minSpeedX = params.minSpeedX;
			minSpeedY = params.minSpeedY;
			if (params.minScaleSpeed !== undefined)		{ setMinScaleSpeed(params.minScaleSpeed); }
			if (params.minScaleSpeedX !== undefined)	{ minScaleSpeedX = params.minScaleSpeedX; }
			if (params.minScaleSpeedY !== undefined)	{ minScaleSpeedY = params.minScaleSpeedY; }
			minRotationSpeed = params.minRotationSpeed;
			minFadingSpeed = params.minFadingSpeed;
			
			maxSpeedX = params.maxSpeedX;
			maxSpeedY = params.maxSpeedY;
			if (params.maxScaleSpeed !== undefined)		{ setMaxScaleSpeed(params.maxScaleSpeed); }
			if (params.maxScaleSpeedX !== undefined)	{ maxScaleSpeedX = params.maxScaleSpeedX; }
			if (params.maxScaleSpeedY !== undefined)	{ maxScaleSpeedY = params.maxScaleSpeedY; }
			maxRotationSpeed = params.maxRotationSpeed;
			maxFadingSpeed = params.maxFadingSpeed;
			
			toX = params.toX;
			toY = params.toY;
			if (params.toScale !== undefined)	{ setToScale(params.toScale); }
			if (params.toScaleX !== undefined)	{ toScaleX = params.toScaleX; }
			if (params.toScaleY !== undefined)	{ toScaleY = params.toScaleY; }
			toAngle = params.toAngle;
			toAlpha = params.toAlpha;
			
			if (params.collider !== undefined) {
				if (CHECK_IS_ARRAY(params.collider) === true) {
					EACH(params.collider, (collider) => {
						addCollider(collider);
					});
				} else {
					addCollider(params.collider);
				}
			}
			
			if (params.touchArea !== undefined) {
				if (CHECK_IS_ARRAY(params.touchArea) === true) {
					EACH(params.touchArea, (touchArea) => {
						addTouchArea(touchArea);
					});
				} else {
					addTouchArea(params.touchArea);
				}
			}
			
			if (params.c !== undefined) {
				if (CHECK_IS_ARRAY(params.c) === true) {
					EACH(params.c, (childNode) => {
						append(childNode);
					});
				} else {
					append(params.c);
				}
			}
			
			if (params.on !== undefined) {
				EACH(params.on, (eventHandler, eventName) => {
					on(eventName, eventHandler);
				});
			}
		}
		
		if (x === undefined)				{ x = 0; }
		if (y === undefined)				{ y = 0; }
		if (centerX === undefined)			{ centerX = 0; }
		if (centerY === undefined)			{ centerY = 0; }
		if (z === undefined)				{ z = 0; }
		if (speedX === undefined)			{ speedX = 0; }
		if (speedY === undefined)			{ speedY = 0; }
		if (accelX === undefined)			{ accelX = 0; }
		if (accelY === undefined)			{ accelY = 0; }
		
		if (scaleX === undefined)			{ scaleX = 1; }
		if (scaleY === undefined)			{ scaleY = 1; }
		if (scalingSpeedX === undefined)	{ scalingSpeedX = 0; }
		if (scalingSpeedY === undefined)	{ scalingSpeedY = 0; }
		if (scalingAccelX === undefined)	{ scalingAccelX = 0; }
		if (scalingAccelY === undefined)	{ scalingAccelY = 0; }
		
		if (angle === undefined)			{ angle = 0; }
		if (rotationSpeed === undefined)	{ rotationSpeed = 0; }
		if (rotationAccel === undefined)	{ rotationAccel = 0; }
		
		if (alpha === undefined)			{ alpha = 1; }
		if (fadingSpeed === undefined)		{ fadingSpeed = 0; }
		if (fadingAccel === undefined)		{ fadingAccel = 0; }
		
		if (SkyEngine.Screen !== self) {
			SkyEngine.Screen.registerNode(self);
		}
		
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
				
				maxSpeedX = -speedOrParams.maxSpeed;
			}
			
			else {
				speedX = -speedOrParams;
			}
		};
		
		let stopLeft = self.stopLeft = (accel) => {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelX = accel;
				maxSpeedX = 0;
			}
			
			else if (speedX < 0) {
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
				
				maxSpeedX = speedOrParams.maxSpeed;
			}
			
			else {
				speedX = speedOrParams;
			}
		};
		
		let stopRight = self.stopRight = (accel) => {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelX = -accel;
				minSpeedX = 0;
			}
			
			else if (speedX > 0) {
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
				
				maxSpeedY = -speedOrParams.maxSpeed;
			}
			
			else {
				speedY = -speedOrParams;
			}
		};
		
		let stopUp = self.stopUp = (accel) => {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelY = accel;
				maxSpeedY = 0;
			}
			
			else if (speedY < 0) {
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
				
				maxSpeedY = speedOrParams.maxSpeed;
			}
			
			else {
				speedY = speedOrParams;
			}
		};
		
		let stopDown = self.stopDown = (accel) => {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelY = -accel;
				minSpeedY = 0;
			}
			
			else if (speedY > 0) {
				speedY = 0;
			}
		};
		
		let moveTo = self.moveTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.toX
			//OPTIONAL: params.toY
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
			if (params.toY === undefined) {
				toX = params.toX;
				moveRight(params);
			} else if (params.toX === undefined) {
				toY = params.toY;
				moveDown(params);
			}
			
			else {
				toX = params.toX;
				toY = params.toY;
				
				let length = Math.sqrt(toX * toX + toY * toY);
				
				if (params.speed !== undefined) {
					speedX = params.speed * toX / length;
					speedY = params.speed * toY / length;
				}
				
				if (params.accel !== undefined) {
					accelX = params.accel * toX / length;
					accelY = params.accel * toY / length;
				}
				
				if (params.maxSpeed !== undefined) {
					maxSpeedX = params.maxSpeed * toX / length;
					maxSpeedY = params.maxSpeed * toY / length;
				}
			}
		};
		
		let rotate = self.rotate = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			
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
			}
			
			else if (rotationSpeed > 0) {
				rotationSpeed = 0;
			}
		};
		
		let rotateTo = self.rotateTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.toAngle
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
		};
		
		let flipX = self.flipX = () => {
			scaleX = -scaleX;
		};
		
		let flipY = self.flipY = () => {
			scaleY = -scaleY;
		};
		
		let fadeIn = self.fadeIn = (speed) => {
			fadingSpeed = speed;
		};
		
		let fadeOut = self.fadeOut = (speed) => {
			fadingSpeed = -speed;
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
			}
			
			else if (fadingSpeed > 0) {
				fadingSpeed = 0;
			}
		};
		
		let fadeTo = self.fadeTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.toAlpha
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
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
		
		let setParent = self.setParent = (_parentNode) => {
			parentNode = _parentNode;
		};
		
		let empty = self.empty = () => {
			
			childNodes.forEach((childNode) => {
				childNode.setParent(undefined);
				childNode.remove();
			});
			
			childNodes = undefined;
		};
		
		let appendToParent = () => {
			
			let parentChildren = parentNode.getChildren();
			
			let minIndex = 0;
			let maxIndex = parentChildren.length - 1;
			
			let index = -1;
			
			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				
				let node = parentChildren[index];
				
				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				} else {
					break;
				}
			}
			
			parentChildren.splice(index + 1, 0, self);
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
		
		let remove = self.remove = () => {
			
			empty();
			
			if (parentNode !== undefined) {
				
				removeFromParent();
				
				setParent(undefined);
			}
			
			if (SkyEngine.Screen !== self) {
				SkyEngine.Screen.unregisterNode(self);
			}
			
			// clear memory.
			childNodes = undefined;
			
			EACH(eventMap, (eventName) => {
				SkyEngine.Screen.unregisterEventNode(eventName, self);
			});
			eventMap = undefined;
			
			colliders = undefined;
			touchAreas = undefined;
			
			collisionTargets = undefined
			collidingNodeIds = undefined;
			meetHandlerMap = undefined;
			partHandlerMap = undefined;
			
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
		
			if (eventMap[eventName] !== undefined) {
				
				REMOVE({
					array : eventMap[eventName],
					value : eventHandler
				});
				
				if (eventMap[eventName].length === 0) {
					delete eventMap[eventName];
					
					SkyEngine.Screen.unregisterEventNode(eventName, self);
				}
			}
		};
		
		let fireEvent = self.fireEvent = (eventName) => {
			
			if (eventMap[eventName] !== undefined) {
				
				eventMap[eventName].forEach((eventHandler) => {
					eventHandler();
				});
			}
		};
		
		let onMeet = self.onMeet = (target, handler) => {
			
			collisionTargets.push(target);
			
			if (meetHandlerMap[target.id] === undefined) {
				meetHandlerMap[target.id] = [];
			}
			
			meetHandlerMap[target.id].push(handler);
		};
		
		let offMeet = self.offMeet = (target, handler) => {
			
			if (handler === undefined) {
				delete meetHandlerMap[target.id];
			} else {
				REMOVE({
					array : meetHandlerMap[target.id],
					value : handler
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
					array : partHandlerMap[target.id],
					value : handler
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
		
		let addCollider = self.addCollider = (collider) => {
			//REQUIRED: collider
			
			colliders.push(collider);
		};
		
		let getColliders = self.getColliders = () => {
			return colliders;
		};
		
		let addTouchArea = self.addTouchArea = (touchArea) => {
			//REQUIRED: touchArea
			
			touchAreas.push(touchArea);
		};
		
		let checkPoint = self.checkPoint = (x, y) => {
			// to implement.
			return false;
		};
		
		let checkArea = self.checkArea = (area) => {
			// to implement.
			return false;
		};
		
		let checkCollision = self.checkCollision = (target) => {
			
			return colliders.every((collider) => {
				return target.getColliders().every((targetCollider) => {
					return collider.checkArea(targetCollider) !== true;
				});
			}) !== true ||
			
			childNodes.every((childNode) => {
				return childNode.checkCollision(target) !== true;
			}) !== true;
		};
		
		let checkTouch = self.checkTouch = (touchX, touchY) => {
			
			return touchAreas.every((touchArea) => {
				return touchArea.checkPoint(touchX, touchY) !== true;
			}) !== true ||
			
			childNodes.every((childNode) => {
				return childNode.checkTouch(touchX, touchY) !== true;
			}) !== true;
		};
		
		let step = self.step = (deltaTime, realSpeedX, realSpeedY, realScalingSpeedX, realScalingSpeedY, realRotationSpeed, realFadingSpeed) => {
			
			if (accelX !== 0) {
				speedX += accelX * deltaTime / 1000;
			}
			
			if (minSpeedX !== undefined && speedX < minSpeedX) {
				speedX = minSpeedX;
			}
			
			if (maxSpeedX !== undefined && speedX > maxSpeedX) {
				speedX = maxSpeedX;
			}
			
			if (accelY !== 0) {
				speedY += accelY * deltaTime / 1000;
			}
			
			if (minSpeedY !== undefined && speedY < minSpeedY) {
				speedY = minSpeedY;
			}
			
			if (maxSpeedY !== undefined && speedY > maxSpeedY) {
				speedY = maxSpeedY;
			}
			
			if (speedX !== 0) {
				x += speedX * deltaTime / 1000;
				
				if (toX !== undefined) {
					
					if ((speedX > 0 && x > toX) || (speedX < 0 && x < toX)) {
						x = toX;
						speedX = 0;
					}
				}
			}
			
			if (speedY !== 0) {
				y += speedY * deltaTime / 1000;
				
				if (toY !== undefined) {
					
					if ((speedY > 0 && y > toY) || (speedY < 0 && y < toY)) {
						y = toY;
						speedY = 0;
					}
				}
			}
			
			if (scalingAccelX !== 0) {
				scalingSpeedX += scalingAccelX * deltaTime / 1000;
			}
			
			if (minScalingSpeedX !== undefined && scalingSpeedX < minScalingSpeedX) {
				scalingSpeedX = minScalingSpeedX;
			}
			
			if (maxScalingSpeedX !== undefined && scalingSpeedX > maxScalingSpeedX) {
				scalingSpeedX = maxScalingSpeedX;
			}
			
			if (scalingAccelY !== 0) {
				scalingSpeedY += scalingAccelY * deltaTime / 1000;
			}
			
			if (minScalingSpeedY !== undefined && scalingSpeedY < minScalingSpeedY) {
				scalingSpeedY = minScalingSpeedY;
			}
			
			if (maxScalingSpeedY !== undefined && scalingSpeedY > maxScalingSpeedY) {
				scalingSpeedY = maxScalingSpeedY;
			}
			
			if (scalingSpeedX !== 0) {
				scaleX += scalingSpeedX * deltaTime / 1000;
				
				if (toScaleX !== undefined) {
					
					if ((scalingSpeedX > 0 && scaleX > toScaleX) || (scalingSpeedX < 0 && scaleX < toScaleX)) {
						scaleX = toScaleX;
						scalingSpeedX = 0;
					}
				}
			}
			
			if (scalingSpeedY !== 0) {
				scaleY += scalingSpeedY * deltaTime / 1000;
				
				if (toScaleY !== undefined) {
					
					if ((scalingSpeedY > 0 && scaleY > toScaleY) || (scalingSpeedY < 0 && scaleY < toScaleY)) {
						scaleY = toScaleY;
						scalingSpeedY = 0;
					}
				}
			}
			
			if (rotationAccel !== 0) {
				rotationSpeed += rotationAccel * deltaTime / 1000;
			}
			
			if (minRotationSpeed !== undefined && rotationSpeed < minRotationSpeed) {
				rotationSpeed = minRotationSpeed;
			}
			
			if (maxRotationSpeed !== undefined && rotationSpeed > maxRotationSpeed) {
				rotationSpeed = maxRotationSpeed;
			}
			
			if (rotationSpeed !== 0) {
				angle += rotationSpeed * deltaTime / 1000;
				
				if (toAngle !== undefined) {
					
					if ((rotationSpeed > 0 && angle > toAngle) || (rotationSpeed < 0 && angle < toAngle)) {
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
				fadingSpeed += fadingAccel * deltaTime / 1000;
			}
			
			if (minFadingSpeed !== undefined && fadingSpeed < minFadingSpeed) {
				fadingSpeed = minFadingSpeed;
			}
			
			if (maxFadingSpeed !== undefined && fadingSpeed > maxFadingSpeed) {
				fadingSpeed = maxFadingSpeed;
			}
			
			if (fadingSpeed !== 0) {
				alpha += fadingSpeed * deltaTime / 1000;
				
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
			
			// check all collisions.
			
			collisionTargets.forEach((target, index, arr) => {
				
				if (target.type === CLASS) {
					
					SkyEngine.Screen.getRegisteredNodes(target).forEach((realTarget, i) => {
						
						if (realTarget !== self) {
							
							if (realTarget.checkIsRemoved() !== true) {
								
								if (self.checkCollision(realTarget) === true || (self.type !== realTarget.type && realTarget.checkCollision(self) === true)) {
									
									if (collidingNodeIds[realTarget.id] === undefined) {
										collidingNodeIds[realTarget.id] = true;
										
										runMeetHandlers(target, realTarget);
									}
								}
								
								else if (collidingNodeIds[realTarget.id] !== undefined) {
									delete collidingNodeIds[realTarget.id];
									
									runPartHandlers(target, realTarget);
								}
							}
							
							else {
								delete collidingNodeIds[realTarget.id];
							}
						}
					});
				}
				
				else if (target.checkIsRemoved() !== true) {
					
					if (self.checkCollision(target) === true || (self.type !== target.type && target.checkCollision(self) === true)) {
						
						if (collidingNodeIds[target.id] === undefined) {
							collidingNodeIds[target.id] = true;
							
							runMeetHandlers(target, target);
						}
					}
					
					else if (collidingNodeIds[target.id] !== undefined) {
						delete collidingNodeIds[target.id];
						
						runPartHandlers(target, target);
					}
				}
				
				else {
					
					arr.splice(index, 1);
					
					delete collidingNodeIds[target.id];
					delete meetHandlerMap[target.id];
					delete partHandlerMap[target.id];
				}
			});
		};
		
		let draw = self.draw = (context, _realX, _realY, _realScaleX, _realScaleY, _realRadian, _realAlpha) => {
			
			realX = _realX;
			realY = _realY;
			realScaleX = _realScaleX;
			realScaleY = _realScaleY;
			realRadian = _realRadian;
			realAlpha = _realAlpha
		};
	}
});
