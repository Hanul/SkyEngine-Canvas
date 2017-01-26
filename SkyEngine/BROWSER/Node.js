/**
 * 노드 트리를 구성하기 위한 노드 클래스
 */
SkyEngine.Node = CLASS({

	init : function(inner, self, params) {
		'use strict';
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
		
		var
		// properties
		x, y, centerX, centerY, z, scaleX, scaleY, angle, alpha,
		
		// speed
		speedX, speedY, scalingSpeedX, scalingSpeedY, rotationSpeed, fadingSpeed,
		
		// accel
		accelX, accelY, scalingAccelX, scalingAccelY, rotationAccel, fadingAccel,
		
		// min speed (undefined면 무제한)
		minSpeedX, minSpeedY, minScalingSpeedX, minScalingSpeedY, minRotationSpeed, minFadingSpeed,
		
		// max speed (undefined면 무제한)
		maxSpeedX, maxSpeedY, maxScalingSpeedX, maxScalingSpeedY, maxRotationSpeed, maxFadingSpeed,
		
		// to properties
		toX, toY, toScaleX, toScaleY, toAngle, toAlpha,
		
		// real properties
		realX, realY, realScaleX, realScaleY, realRadian, realAlpha,
		
		// parent node
		parentNode,

		// child nodes
		childNodes = [],
		
		// is hiding
		isHiding = false,
		
		// is removed
		isRemoved = false,
		
		// event map
		eventMap = {},
		
		// colliders
		colliders = [],
		
		// touch areas
		touchAreas = [],
		
		// collision targets
		collisionTargets = [],
		
		// colliding node ids
		collidingNodeIds = {},
		
		// meet handler map
		meetHandlerMap = {},
		
		// part handler map
		partHandlerMap = {},
		
		// set/get properties.
		setX, getX, setY, getY, setCenterX, getCenterX, setCenterY, getCenterY, setZ, getZ, setScaleX, getScaleX, setScaleY, getScaleY, setScale, setAngle, getAngle, setAlpha, getAlpha,
		
		// set/get speed.
		setSpeedX, getSpeedX, setSpeedY, getSpeedY, setScalingSpeedX, getScalingSpeedX, setScalingSpeedY, getScalingSpeedY, setScalingSpeed, setRotationSpeed, getRotationSpeed, setFadingSpeed, getFadingSpeed,
		
		// set/get accel.
		setAccelX, getAccelX, setAccelY, getAccelY, setScalingAccelX, getScalingAccelX, setScalingAccelY, getScalingAccelY, setScalingAccel, setRotationAccel, getRotationAccel, setFadingAccel, getFadingAccel,
		
		// set/get min speed.
		setMinSpeedX, getMinSpeedX, setMinSpeedY, getMinSpeedY, setMinScalingSpeedX, getMinScalingSpeedX, setMinScalingSpeedY, getMinScalingSpeedY, setMinScalingSpeed, setMinRotationSpeed, getMinRotationSpeed, setMinFadingSpeed, getMinFadingSpeed,
		
		// set/get max speed.
		setMaxSpeedX, getMaxSpeedX, setMaxSpeedY, getMaxSpeedY, setMaxScalingSpeedX, getMaxScalingSpeedX, setMaxScalingSpeedY, getMaxScalingSpeedY, setMaxScalingSpeed, setMaxRotationSpeed, getMaxRotationSpeed, setMaxFadingSpeed, getMaxFadingSpeed,
		
		// set/get to properties.
		setToX, getToX, setToY, getToY, setToScaleX, getToScaleX, setToScaleY, getToScaleY, setToScale, setToAngle, getToAngle, setToAlpha, getToAlpha,
		
		// get real properties.
		getRealX, getRealY, getRealScaleX, getRealScaleY, getRealRadian, getRealAlpha,
		
		// move/stop left.
		moveLeft, stopLeft,
		
		// move/stop right.
		moveRight, stopRight,
		
		// move/stop up.
		moveUp, stopUp,
		
		// move/stop down.
		moveDown, stopDown,
		
		// move to.
		moveTo,
		
		// rotate.
		rotate, stopRotation, rotateTo,
		
		// flip.
		flipX, flipY,
		
		// fade.
		fadeIn, fadeOut, stopFading, fadeTo,
		
		// hide/show.
		hide, show,
		
		// check is hiding.
		checkIsHiding,
		
		// get children.
		getChildren,
		
		// get parent.
		getParent,
		
		// set parent.
		setParent,
		
		// empty.
		empty,
		
		// append to parent.
		appendToParent,
		
		// remove from parent.
		removeFromParent,
		
		// append.
		append,
		
		// append to.
		appendTo,

		// remove.
		remove,
		
		// check is removed.
		checkIsRemoved,

		// on.
		on,

		// off.
		off,
		
		// fire event.
		fireEvent,
		
		// on meet.
		onMeet,
		
		// off meet.
		offMeet,
		
		// run meet handlers.
		runMeetHandlers,
		
		// on part.
		onPart,
		
		// off part.
		offPart,
		
		// run part handlers.
		runPartHandlers,
		
		// add collider.
		addCollider,
		
		// get colliders.
		getColliders,
		
		// add touch area.
		addTouchArea,
		
		// check point.
		checkPoint,
		
		// check area.
		checkArea,
		
		// check collision.
		checkCollision,
		
		// check touch.
		checkTouch,
		
		// step.
		step,
		
		// draw.
		draw;
		
		self.setX = setX = function(_x)							{ x = _x; };
		self.getX = getX = function()							{ return x; };
		self.setY = setY = function(_y)							{ y = _y; };
		self.getY = getY = function()							{ return y; };
		self.setCenterX = setCenterX = function(_centerX)		{ centerX = _centerX; };
		self.getCenterX = getCenterX = function()				{ return centerX; };
		self.setCenterY = setCenterY = function(_centerY)		{ centerY = _centerY; };
		self.getCenterY = getCenterY = function()				{ return centerY; };
		self.setZ = setZ = function(_z)	{
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		self.getZ = getZ = function()							{ return z; };
		self.setSpeedX = setSpeedX = function(_speedX)			{ speedX = _speedX; };
		self.getSpeedX = getSpeedX = function()					{ return speedX; };
		self.setSpeedY = setSpeedY = function(_speedY)			{ speedY = _speedY; };
		self.getSpeedY = getSpeedY = function()					{ return speedY; };
		self.setAccelX = setAccelX = function(_accelX)			{ accelX = _accelX; };
		self.getAccelX = getAccelX = function()					{ return accelX; };
		self.setAccelY = setAccelY = function(_accelY)			{ accelY = _accelY; };
		self.getAccelY = getAccelY = function()					{ return accelY; };
		self.setMinSpeedX = setMinSpeedX = function(_minSpeedX)	{ minSpeedX = _minSpeedX; };
		self.getMinSpeedX = getMinSpeedX = function()			{ return minSpeedX; };
		self.setMinSpeedY = setMinSpeedY = function(_minSpeedY)	{ minSpeedY = _minSpeedY; };
		self.getMinSpeedY = getMinSpeedY = function()			{ return minSpeedY; };
		self.setMaxSpeedX = setMaxSpeedX = function(_maxSpeedX)	{ maxSpeedX = _maxSpeedX; };
		self.getMaxSpeedX = getMaxSpeedX = function()			{ return maxSpeedX; };
		self.setMaxSpeedY = setMaxSpeedY = function(_maxSpeedY)	{ maxSpeedY = _maxSpeedY; };
		self.getMaxSpeedY = getMaxSpeedY = function()			{ return maxSpeedY; };
		self.setToX = setToX = function(_toX)					{ toX = _toX; };
		self.getToX = getToX = function()						{ return toX; };
		self.setToY = setToY = function(_toY)					{ toY = _toY; };
		self.getToY = getToY = function()						{ return toY; };
		
		self.setScaleX = setScaleX = function(_scaleX)									{ scaleX = _scaleX; };
		self.getScaleX = getScaleX = function()											{ return scaleX; };
		self.setScaleY = setScaleY = function(_scaleY)									{ scaleY = _scaleY; };
		self.getScaleY = getScaleY = function()											{ return scaleY; };
		self.setScale = setScale = function(scale) {
			scaleX = scale;
			scaleY = scale;
		};
		self.setScalingSpeedX = setScalingSpeedX = function(_scalingSpeedX)				{ scalingSpeedX = _scalingSpeedX; };
		self.getScalingSpeedX = getScalingSpeedX = function()							{ return scalingSpeedX; };
		self.setScalingSpeedY = setScalingSpeedY = function(_scalingSpeedY)				{ scalingSpeedY = _scalingSpeedY; };
		self.getScalingSpeedY = getScalingSpeedY = function()							{ return scalingSpeedY; };
		self.setScalingSpeed = setScalingSpeed = function(scalingSpeed) {
			scalingSpeedX = scalingSpeed;
			scalingSpeedY = scalingSpeed;
		};
		self.setScalingAccelX = setScalingAccelX = function(_scalingAccelX)				{ scalingAccelX = _scalingAccelX; };
		self.getScalingAccelX = getScalingAccelX = function()							{ return scalingAccelX; };
		self.setScalingAccelY = setScalingAccelY = function(_scalingAccelY)				{ scalingAccelY = _scalingAccelY; };
		self.getScalingAccelY = getScalingAccelY = function()							{ return scalingAccelY; };
		self.setScalingAccel = setScalingAccel = function(scalingAccel) {
			scalingAccelX = scalingAccel;
			scalingAccelY = scalingAccel;
		};
		self.setMinScalingSpeedX = setMinScalingSpeedX = function(_minScalingSpeedX)	{ minScalingSpeedX = _minScalingSpeedX; };
		self.getMinScalingSpeedX = getMinScalingSpeedX = function()						{ return minScalingSpeedX; };
		self.setMinScalingSpeedY = setMinScalingSpeedY = function(_minScalingSpeedY)	{ minScalingSpeedY = _minScalingSpeedY; };
		self.getMinScalingSpeedY = getMinScalingSpeedY = function()						{ return minScalingSpeedY; };
		self.setMinScalingSpeed = setMinScalingSpeed = function(minScalingSpeed) {
			minScalingSpeedX = minScalingSpeed;
			minScalingSpeedY = minScalingSpeed;
		};
		self.setMaxScalingSpeedX = setMaxScalingSpeedX = function(_maxScalingSpeedX)	{ maxScalingSpeedX = _maxScalingSpeedX; };
		self.getMaxScalingSpeedX = getMaxScalingSpeedX = function()						{ return maxScalingSpeedX; };
		self.setMaxScalingSpeedY = setMaxScalingSpeedY = function(_maxScalingSpeedY)	{ maxScalingSpeedY = _maxScalingSpeedY; };
		self.getMaxScalingSpeedY = getMaxScalingSpeedY = function()						{ return maxScalingSpeedY; };
		self.setMaxScalingSpeed = setMaxScalingSpeed = function(maxScalingSpeed) {
			maxScalingSpeedX = maxScalingSpeed;
			maxScalingSpeedY = maxScalingSpeed;
		};
		self.setToScaleX = setToScaleX = function(_toScaleX)							{ toScaleX = _toScaleX; };
		self.getToScaleX = getToScaleX = function()										{ return toScaleX; };
		self.setToScaleY = setToScaleY = function(_toScaleY)							{ toScaleY = _toScaleY; };
		self.getToScaleY = getToScaleY = function()										{ return toScaleY; };
		self.setToScale = setToScale = function(toScale) {
			toScaleX = toScale;
			toScaleY = toScale;
		};
		
		self.setAngle = setAngle = function(_angle)										{ angle = _angle; };
		self.getAngle = getAngle = function()											{ return angle; };
		self.setRotationSpeed = setRotationSpeed = function(_rotationSpeed)				{ rotationSpeed = _rotationSpeed; };
		self.getRotationSpeed = getRotationSpeed = function()							{ return rotationSpeed; };
		self.setRotationAccel = setRotationAccel = function(_rotationAccel)				{ rotationAccel = _rotationAccel; };
		self.getRotationAccel = getRotationAccel = function()							{ return rotationAccel; };
		self.setMinRotationSpeed = setMinRotationSpeed = function(_minRotationSpeed)	{ minRotationSpeed = _minRotationSpeed; };
		self.getMinRotationSpeed = getMinRotationSpeed = function()						{ return minRotationSpeed; };
		self.setMaxRotationSpeed = setMaxRotationSpeed = function(_maxRotationSpeed)	{ maxRotationSpeed = _maxRotationSpeed; };
		self.getMaxRotationSpeed = getMaxRotationSpeed = function()						{ return maxRotationSpeed; };
		self.setToAngle = setToAngle = function(_toAngle)								{ toAngle = _toAngle; };
		self.getToAngle = getToAngle = function()										{ return toAngle; };
		
		self.setAlpha = setAlpha = function(_alpha)								{ alpha = _alpha; };
		self.getAlpha = getAlpha = function()									{ return alpha; };
		self.setFadingSpeed = setFadingSpeed = function(_fadingSpeed)			{ fadingSpeed = _fadingSpeed; };
		self.getFadingSpeed = getFadingSpeed = function()						{ return fadingSpeed; };
		self.setFadingAccel = setFadingAccel = function(_fadingAccel)			{ fadingAccel = _fadingAccel; };
		self.getFadingAccel = getFadingAccel = function()						{ return fadingAccel; };
		self.setMinFadingSpeed = setMinFadingSpeed = function(_minFadingSpeed)	{ minFadingSpeed = _minFadingSpeed; };
		self.getMinFadingSpeed = getMinFadingSpeed = function()					{ return minFadingSpeed; };
		self.setMaxFadingSpeed = setMaxFadingSpeed = function(_maxFadingSpeed)	{ maxFadingSpeed = _maxFadingSpeed; };
		self.getMaxFadingSpeed = getMaxFadingSpeed = function()					{ return maxFadingSpeed; };
		self.setToAlpha = setToAlpha = function(_toAlpha)						{ toAlpha = _toAlpha; };
		self.getToAlpha = getToAlpha = function()								{ return toAlpha; };
		
		self.getRealX = getRealX = function()									{ return realX; };
		self.getRealY = getRealY = function()									{ return realY; };
		self.getRealScaleX = getRealScaleX = function()							{ return realScaleX; };
		self.getRealScaleY = getRealScaleY = function()							{ return realScaleY; };
		self.getRealRadian = getRealRadian = function(_toAlpha)					{ return realRadian; };
		self.getRealAlpha = getRealAlpha = function(_toAlpha)					{ return realAlpha; };
		
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
					EACH(params.collider, function(collider) {
						addCollider(collider);
					});
				} else {
					addCollider(params.collider);
				}
			}
			
			if (params.touchArea !== undefined) {
				if (CHECK_IS_ARRAY(params.touchArea) === true) {
					EACH(params.touchArea, function(touchArea) {
						addTouchArea(touchArea);
					});
				} else {
					addTouchArea(params.touchArea);
				}
			}
			
			if (params.c !== undefined) {
				if (CHECK_IS_ARRAY(params.c) === true) {
					EACH(params.c, function(childNode) {
						append(childNode);
					});
				} else {
					append(params.c);
				}
			}
			
			if (params.on !== undefined) {
				EACH(params.on, function(eventHandler, eventName) {
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
		
		self.moveLeft = moveLeft = function(speedOrParams) {
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
		
		self.stopLeft = stopLeft = function(accel) {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelX = accel;
				maxSpeedX = 0;
			}
			
			else if (speedX < 0) {
				speedX = 0;
			}
		};
		
		self.moveRight = moveRight = function(speedOrParams) {
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
		
		self.stopRight = stopRight = function(accel) {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelX = -accel;
				minSpeedX = 0;
			}
			
			else if (speedX > 0) {
				speedX = 0;
			}
		};
		
		self.moveUp = moveUp = function(speedOrParams) {
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
		
		self.stopUp = stopUp = function(accel) {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelY = accel;
				maxSpeedY = 0;
			}
			
			else if (speedY < 0) {
				speedY = 0;
			}
		};
		
		self.moveDown = moveDown = function(speedOrParams) {
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
		
		self.stopDown = stopDown = function(accel) {
			//OPTIONAL: accel
			
			if (accel !== undefined) {
				accelY = -accel;
				minSpeedY = 0;
			}
			
			else if (speedY > 0) {
				speedY = 0;
			}
		};
		
		self.moveTo = moveTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.toX
			//OPTIONAL: params.toY
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
			var
			// length
			length;
			
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
				
				length = Math.sqrt(toX * toX + toY * toY);
				
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
		
		self.rotate = rotate = function(speedOrParams) {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			
		};
		
		self.stopRotation = stopRotation = function(accel) {
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
		
		self.rotateTo = rotateTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.toAngle
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
		};
		
		self.flipX = flipX = function() {
			scaleX = -scaleX;
		};
		
		self.flipY = flipY = function() {
			scaleY = -scaleY;
		};
		
		self.fadeIn = fadeIn = function(speed) {
			fadingSpeed = speed;
		};
		
		self.fadeOut = fadeOut = function(speed) {
			fadingSpeed = -speed;
		};
		
		self.stopFading = stopFading = function(accel) {
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
		
		self.fadeTo = fadeTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.toAlpha
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			
		};
		
		self.hide = hide = function() {
			isHiding = true;
		};
		
		self.show = show = function() {
			isHiding = false;
		};
		
		self.checkIsHiding = checkIsHiding = function() {
			return isHiding;
		};
		
		self.getChildren = getChildren = function() {
			return childNodes;
		};
		
		self.getParent = getParent = function() {
			return parentNode;
		};
		
		self.setParent = setParent = function(_parentNode) {
			parentNode = _parentNode;
		};
		
		self.empty = empty = function() {
			
			childNodes.forEach(function(childNode) {
				childNode.setParent(undefined);
				childNode.remove();
			});
			
			childNodes = undefined;
		};
		
		appendToParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = -1,
			
			// node
			node;
			
			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				
				node = parentChildren[index];
				
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
		
		removeFromParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = -1,
			
			// node
			node,
			
			// level
			level = 0;

			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				
				node = parentChildren[index];
				
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

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node
			
			if (parentNode !== undefined) {
				removeFromParent();
			}
			
			setParent(node);
			
			appendToParent();

			return self;
		};
		
		self.append = append = function(node) {
			//REQUIRED: node
			
			node.appendTo(self);
		};
		
		self.remove = remove = function() {
			
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
			
			EACH(eventMap, function(eventName) {
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
		
		self.checkIsRemoved = checkIsRemoved = function() {
			return isRemoved;
		};
		
		self.on = on = function(eventName, eventHandler) {
			
			if (eventMap[eventName] === undefined) {
				eventMap[eventName] = [];
				
				SkyEngine.Screen.registerEventNode(eventName, self);
			}
			
			eventMap[eventName].push(eventHandler);
		};
		
		self.off = off = function(eventName, eventHandler) {
		
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
		
		self.fireEvent = fireEvent = function(eventName) {
			
			if (eventMap[eventName] !== undefined) {
				
				eventMap[eventName].forEach(function(eventHandler) {
					eventHandler();
				});
			}
		};
		
		self.onMeet = onMeet = function(target, handler) {
			
			collisionTargets.push(target);
			
			if (meetHandlerMap[target.id] === undefined) {
				meetHandlerMap[target.id] = [];
			}
			
			meetHandlerMap[target.id].push(handler);
		};
		
		self.offMeet = offMeet = function(target, handler) {
			
			if (handler === undefined) {
				delete meetHandlerMap[target.id];
			} else {
				REMOVE({
					array : meetHandlerMap[target.id],
					value : handler
				});
			}
		};
		
		self.runMeetHandlers = runMeetHandlers = function(target, realTarget) {
			
			if (meetHandlerMap[target.id] !== undefined) {
				
				meetHandlerMap[target.id].forEach(function(handler) {
					handler(realTarget);
				});
			}
		};
		
		self.onPart = onPart = function(target, handler) {
			
			collisionTargets.push(target);
			
			if (partHandlerMap[target.id] === undefined) {
				partHandlerMap[target.id] = [];
			}
			
			partHandlerMap[target.id].push(handler);
		};
		
		self.offPart = offPart = function(target, handler) {
			
			if (handler === undefined) {
				delete partHandlerMap[target.id];
			} else {
				REMOVE({
					array : partHandlerMap[target.id],
					value : handler
				});
			}
		};
		
		self.runPartHandlers = runPartHandlers = function(target, realTarget) {
			
			if (partHandlerMap[target.id] !== undefined) {
				
				partHandlerMap[target.id].forEach(function(handler) {
					handler(realTarget);
				});
			}
		};
		
		self.addCollider = addCollider = function(collider) {
			//REQUIRED: collider
			
			colliders.push(collider);
		};
		
		self.getColliders = getColliders = function() {
			return colliders;
		};
		
		self.addTouchArea = addTouchArea = function(touchArea) {
			//REQUIRED: touchArea
			
			touchAreas.push(touchArea);
		};
		
		self.checkPoint = checkPoint = function(x, y) {
			// to implement.
			return false;
		};
		
		self.checkArea = checkArea = function(area) {
			// to implement.
			return false;
		};
		
		self.checkCollision = checkCollision = function(target) {
			
			return colliders.every(function(collider) {
				return target.getColliders().every(function(targetCollider) {
					return collider.checkArea(targetCollider) !== true;
				});
			}) !== true ||
			
			childNodes.every(function(childNode) {
				return childNode.checkCollision(target) !== true;
			}) !== true;
		};
		
		self.checkTouch = checkTouch = function(touchX, touchY) {
			
			return touchAreas.every(function(touchArea) {
				return touchArea.checkPoint(touchX, touchY) !== true;
			}) !== true ||
			
			childNodes.every(function(childNode) {
				return childNode.checkTouch(touchX, touchY) !== true;
			}) !== true;
		};
		
		self.step = step = function(deltaTime, realSpeedX, realSpeedY, realScalingSpeedX, realScalingSpeedY, realRotationSpeed, realFadingSpeed) {
			
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
			
			collisionTargets.forEach(function(target, index, arr) {
				
				if (target.type === CLASS) {
					
					SkyEngine.Screen.getRegisteredNodes(target).forEach(function(realTarget, i) {
						
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
		
		self.draw = draw = function(context, _realX, _realY, _realScaleX, _realScaleY, _realRadian, _realAlpha) {
			
			realX = _realX;
			realY = _realY;
			realScaleX = _realScaleX;
			realScaleY = _realScaleY;
			realRadian = _realRadian;
			realAlpha = _realAlpha
		};
	}
});
