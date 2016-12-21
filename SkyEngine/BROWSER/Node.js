/**
 * 트리 구조를 정의하기 위한 Node 클래스 
 * 
 * + 이동 처리
 * + 회전 처리
 */
SkyEngine.Node = CLASS({

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//OPTIONAL: params.speedX
		//OPTIONAL: params.speedY
		//OPTIONAL: params.accelX
		//OPTIONAL: params.accelY
		//OPTIONAL: params.minSpeedX
		//OPTIONAL: params.minSpeedY
		//OPTIONAL: params.maxSpeedX
		//OPTIONAL: params.maxSpeedY
		//OPTIONAL: params.toX
		//OPTIONAL: params.toY
		
		//OPTIONAL: params.scale
		//OPTIONAL: params.scaleX
		//OPTIONAL: params.scaleY
		//OPTIONAL: params.scalingSpeed
		//OPTIONAL: params.scalingSpeedX
		//OPTIONAL: params.scalingSpeedY
		//OPTIONAL: params.scalingAccel
		//OPTIONAL: params.scalingAccelX
		//OPTIONAL: params.scalingAccelY
		//OPTIONAL: params.minScalingSpeed
		//OPTIONAL: params.minScalingSpeedX
		//OPTIONAL: params.minScalingSpeedY
		//OPTIONAL: params.maxScalingSpeed
		//OPTIONAL: params.maxScalingSpeedX
		//OPTIONAL: params.maxScalingSpeedY
		//OPTIONAL: params.toScale
		//OPTIONAL: params.toScaleX
		//OPTIONAL: params.toScaleY
		
		//OPTIONAL: params.angle
		//OPTIONAL: params.rotationSpeed
		//OPTIONAL: params.rotationAccel
		//OPTIONAL: params.minRotationSpeed
		//OPTIONAL: params.maxRotationSpeed
		//OPTIONAL: params.toAngle
		
		//OPTIONAL: params.alpha
		//OPTIONAL: params.fadingSpeed
		//OPTIONAL: params.fadingAccel
		//OPTIONAL: params.minFadingSpeed
		//OPTIONAL: params.maxFadingSpeed
		//OPTIONAL: params.toAlpha
		
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		var
		// properties
		x, y, z, scaleX, scaleY, angle, alpha,
		
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
		
		// parent node
		parentNode,

		// child nodes
		childNodes = [],
		
		// is hiding
		isHiding = false,
		
		// event map
		eventMap = {},
		
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
		
		// on part.
		onPart,
		
		// off part.
		offPart,
		
		// set/get properties.
		setX, getX, setY, getY, setZ, getZ, setScale, setScaleX, getScaleX, setScaleY, getScaleY, getAngle, setAngle, getAlpha, setAlpha,
		
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
		
		// add collider.
		addCollider,
		
		// add touch area.
		addTouchArea,
		
		// check collision.
		checkCollision,
		
		// check touch.
		checkTouch,
		
		// step.
		step,
		
		// draw.
		draw;
		
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
			
			// clear memory.
			childNodes = undefined;
			eventMap = undefined;
		};
		
		self.on = on = function(eventName, eventHandler) {
			
			if (eventMap[eventName] === undefined) {
				eventMap[eventName] = [];
			}
			
			eventMap[eventName].push(eventHandler);
		};
		
		self.off = off = function(eventName, eventHandler) {
		
			if (eventMap[eventName] !== undefined) {
				
				REMOVE({
					array : eventMap[eventName],
					value : eventHandler
				});
			}
		};
		
		self.fireEvent = fireEvent = function(eventName) {
			
			if (eventMap[eventName] !== undefined) {
				
				eventMap[eventName].forEach(function(eventHandler) {
					eventHandler();
				});
			}
		};
		
		self.onMeet = onMeet = function(target, eventHandler) {
			
		};
		
		self.offMeet = offMeet = function(target, eventHandler) {
			
		};
		
		self.onPart = onPart = function(target, eventHandler) {
			
		};
		
		self.offPart = offPart = function(target, eventHandler) {
			
		};
		
		self.setX = setX = function(_x)							{ x = _x; };
		self.getX = getX = function()							{ return x; };
		self.setY = setY = function(_y)							{ y = _y; };
		self.getY = getY = function()							{ return y; };
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
		
		// 파라미터 초기화
		if (params !== undefined) {
			
			x = params.x;
			y = params.y;
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
			
			if (params.c !== undefined) {
				if (CHECK_IS_ARRAY(params.c) === true) {
					params.c.forEach(function(childNode) {
						childNode.appendTo(self);
					});
				} else {
					params.c.appendTo(self);
				}
			}
		}
		
		if (x === undefined)				{ x = 0; }
		if (y === undefined)				{ y = 0; }
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
		
		self.addCollider = addCollider = function(collider) {
			//REQUIRED: collider
		};
		
		self.addTouchArea = addTouchArea = function(touchArea) {
			//REQUIRED: touchArea
		};
		
		self.checkCollision = checkCollision = function(target) {
			// to implement.
			return false;
		};
		
		self.checkTouch = checkTouch = function(touchX, touchY) {
			// to implement.
			return false;
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
		};
		
		self.draw = draw = function(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha) {
			// to implement.
		};
	}
});
