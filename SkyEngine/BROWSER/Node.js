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
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		//OPTIONAL: params.scale
		//OPTIONAL: params.scaleX
		//OPTIONAL: params.scaleY
		
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//OPTIONAL: params.speedX
		//OPTIONAL: params.speedY
		//OPTIONAL: params.accelX
		//OPTIONAL: params.accelY
		//OPTIONAL: params.maxSpeedX
		//OPTIONAL: params.maxSpeedY
		//OPTIONAL: params.toX
		//OPTIONAL: params.toY
		
		//OPTIONAL: params.angle
		//OPTIONAL: params.rotationSpeed
		//OPTIONAL: params.rotationAccel
		//OPTIONAL: params.maxRotationSpeed
		//OPTIONAL: params.toAngle
		
		//OPTIONAL: params.alpha
		//OPTIONAL: params.fadingSpeed
		//OPTIONAL: params.fadingAccel
		//OPTIONAL: params.maxFadingSpeed
		//OPTIONAL: params.toAlpha
		
		var
		// parent node
		parentNode,

		// child nodes
		childNodes = [],
		
		// scale
		scaleX, scaleY,
		
		// position
		x, y, z,
		
		// speed
		speedX, speedY,
		
		// accel
		accelX, accelY,
		
		// max speed (undefined면 무제한)
		maxSpeedX, maxSpeedY,
		
		// to position
		toX, toY,
		
		// for rotation
		angle, rotationSpeed, rotationAccel, maxRotationSpeed, toAngle,
		
		// for fading
		alpha, fadingSpeed, fadingAccel, maxFadingSpeed, toAlpha,
		
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
		
		// set/get scale.
		setScaleX, getScaleX, setScaleY, getScaleY, setScale,
		
		// set/get position.
		setX, getX, setY, getY, setZ, getZ,
		
		// set/get speed.
		setSpeedX, getSpeedX, setSpeedY, getSpeedY,
		
		// set/get accel.
		setAccelX, getAccelX, setAccelY, getAccelY,
		
		// set/get max speed.
		setMaxSpeedX, getMaxSpeedX, setMaxSpeedY, getMaxSpeedY,
		
		// set/get to position.
		setToX, getToX, setToY, getToY,
		
		// for rotation.
		setAngle, getAngle, setRotationSpeed, getRotationSpeed, setRotationAccel, getRotationAccel, setMaxRotationSpeed, getMaxRotationSpeed, setToAngle, getToAngle,
		
		// for fading.
		setAlpha, getAlpha, setFadingSpeed, getFadingSpeed, setFadingAccel, getFadingAccel, setMaxFadingSpeed, getMaxFadingSpeed, setToAlpha, getToAlpha,
		
		// move.
		move,
		
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
		rotate, stopRotation,
		
		// stop. (모든 움직임을 멈춘다.)
		stop,
		
		// fade.
		fadeIn, fadeOut, stopFading,
		
		// hide/show.
		hide, show,
		
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
		
		self.setScale = setScale = function(scale) {
			scaleX = scale;
			scaleY = scale;
		};
		
		// 파라미터 초기화
		if (params !== undefined) {
			
			if (params.scale !== undefined)		{ setScale(params.scale); }
			if (params.scaleX !== undefined)	{ scaleX = params.scaleX; }
			if (params.scaleY !== undefined)	{ scaleY = params.scaleY; }
			
			x = params.x;
			y = params.y;
			z = params.z;
			
			speedX = params.speedX;
			speedY = params.speedY;
			
			accelX = params.accelX;
			accelY = params.accelY;
			
			maxSpeedX = params.maxSpeedX;
			maxSpeedY = params.maxSpeedY;
			
			toX = params.toX;
			toY = params.toY;
			
			angle = params.angle;
			rotationSpeed = params.rotationSpeed;
			rotationAccel = params.rotationAccel;
			maxRotationSpeed = params.maxRotationSpeed;
			toAngle = params.toAngle;
			
			alpha = params.alpha;
			fadingSpeed = params.fadingSpeed;
			fadingAccel = params.fadingAccel;
			maxFadingSpeed = params.maxFadingSpeed;
			toAlpha = params.toAlpha;
		}
		
		if (scaleX === undefined)			{ scaleX = 1; }
		if (scaleY === undefined)			{ scaleY = 1; }
		
		if (x === undefined)				{ x = 0; }
		if (y === undefined)				{ y = 0; }
		if (z === undefined)				{ z = 0; }
		
		if (speedX === undefined)			{ speedX = 0; }
		if (speedY === undefined)			{ speedY = 0; }
		
		if (accelX === undefined)			{ accelX = 0; }
		if (accelY === undefined)			{ accelY = 0; }
		
		if (maxSpeedX === undefined)		{ maxSpeedX = 0; }
		if (maxSpeedY === undefined)		{ maxSpeedY = 0; }
		
		if (toX === undefined)				{ toX = 0; }
		if (toY === undefined)				{ toY = 0; }
		
		if (angle === undefined)			{ angle = 0; }
		if (rotationSpeed === undefined)	{ rotationSpeed = 0; }
		if (rotationAccel === undefined)	{ rotationAccel = 0; }
		if (maxRotationSpeed === undefined)	{ maxRotationSpeed = 0; }
		if (toAngle === undefined)			{ toAngle = 0; }
		
		if (alpha === undefined)			{ alpha = 1; }
		if (fadingSpeed === undefined)		{ fadingSpeed = 0; }
		if (fadingAccel === undefined)		{ fadingAccel = 0; }
		if (maxFadingSpeed === undefined)	{ maxFadingSpeed = 0; }
		if (toAlpha === undefined)			{ toAlpha = 1; }
		
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
		};
		
		self.on = on = function() {
			
		};
		
		self.off = off = function() {
			
		};
		
		self.fireEvent = fireEvent = function() {
			
		};
		
		self.onMeet = onMeet = function() {
			
		};
		
		self.offMeet = offMeet = function() {
			
		};
		
		self.onPart = onPart = function() {
			
		};
		
		self.offPart = offPart = function() {
			
		};
		
		self.setScaleX = setScaleX = function(_scaleX) {
			scaleX = _scaleX;
		};
		
		self.getScaleX = getScaleX = function() {
			return scaleX;
		};
		
		self.setScaleY = setScaleY = function(_scaleX) {
			scaleX = _scaleX;
		};
		
		self.getScaleY = getScaleY = function() {
			return scaleY;
		};
		
		self.setX = setX = function(_x) {
			x = _x;
		};
		
		self.getX = getX = function() {
			return x;
		};
		
		self.setY = setY = function(_y) {
			y = _y;
		};
		
		self.getY = getY = function() {
			return y;
		};
		
		self.setZ = setZ = function(_z) {
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		
		self.getZ = getZ = function() {
			return z;
		};
		
		self.setSpeedX = setSpeedX = function(_speedX) {
			speedX = _speedX;
		};
		
		self.getSpeedX = getSpeedX = function() {
			return speedX;
		};
		
		self.setSpeedY = setSpeedY = function(_speedY) {
			speedY = _speedY;
		};
		
		self.getSpeedY = getSpeedY = function() {
			return speedY;
		};
		
		self.setAccelX = setAccelX = function(_accelX) {
			accelX = _accelX;
		};
		
		self.getAccelX = getAccelX = function() {
			return accelX;
		};
		
		self.setAccelY = setAccelY = function(_accelY) {
			accelY = _accelY;
		};
		
		self.getAccelY = getAccelY = function() {
			return accelY;
		};
		
		self.setMaxSpeedX = setMaxSpeedX = function(_maxSpeedX) {
			maxSpeedX = _maxSpeedX;
		};
		
		self.getMaxSpeedX = getMaxSpeedX = function() {
			return maxSpeedX;
		};
		
		self.setMaxSpeedY = setMaxSpeedY = function(_maxSpeedY) {
			maxSpeedY = _maxSpeedY;
		};
		
		self.getMaxSpeedY = getMaxSpeedY = function() {
			return maxSpeedY;
		};
		
		self.setToX = setToX = function(_toX) {
			toX = _toX;
		};
		
		self.getToX = getToX = function() {
			return toX;
		};
		
		self.setToY = setToY = function(_toY) {
			toY = _toY;
		};
		
		self.getToY = getToY = function() {
			return toY;
		};
		
		self.setAngle = setAngle = function(_angle) {
			angle = _angle;
		};
		
		self.getAngle = getAngle = function() {
			return angle;
		};
		
		self.setRotationSpeed = setRotationSpeed = function(_rotationSpeed) {
			rotationSpeed = _rotationSpeed;
		};
		
		self.getRotationSpeed = getRotationSpeed = function() {
			return rotationSpeed;
		};
		
		self.setRotationAccel = setRotationAccel = function(_rotationAccel) {
			rotationAccel = _rotationAccel;
		};
		
		self.getRotationAccel = getRotationAccel = function() {
			return rotationAccel;
		};
		
		self.setMaxRotationSpeed = setMaxRotationSpeed = function(_maxRotationSpeed) {
			maxRotationSpeed = _maxRotationSpeed;
		};
		
		self.getMaxRotationSpeed = getMaxRotationSpeed = function() {
			return maxRotationSpeed;
		};
		
		self.setToAngle = setToAngle = function(_toAngle) {
			toAngle = _toAngle;
		};
		
		self.getToAngle = getToAngle = function() {
			return toAngle;
		};
		
		self.setAlpha = setAlpha = function(_alpha) {
			alpha = _alpha
		};
		
		self.getAlpha = getAlpha = function() {
			return alpha;
		};
		
		self.setFadingSpeed = setFadingSpeed = function(_fadingSpeed) {
			fadingSpeed = _fadingSpeed;
		};
		
		self.getFadingSpeed = getFadingSpeed = function() {
			return fadingSpeed;
		};
		
		self.setFadingAccel = setFadingAccel = function(_fadingAccel) {
			fadingAccel = _fadingAccel;
		};
		
		self.getFadingAccel = getFadingAccel = function() {
			return fadingAccel;
		};
		
		self.setMaxFadingSpeed = setMaxFadingSpeed = function(_maxFadingSpeed) {
			maxFadingSpeed = _maxFadingSpeed;
		};
		
		self.getMaxFadingSpeed = getMaxFadingSpeed = function() {
			return maxFadingSpeed;
		};
		
		self.setToAlpha = setToAlpha = function(_toAlpha) {
			toAlpha = _toAlpha;
		};
		
		self.getToAlpha = getToAlpha = function() {
			return toAlpha;
		};
		
		self.move = move = function() {
		};
		
		self.moveLeft = moveLeft = function(speed) {
			speedX = -speed;
		};
		
		self.stopLeft = stopLeft = function() {
			if (speedX < 0) {
				speedX = 0;
			}
		};
		
		self.moveRight = moveRight = function(speed) {
			speedX = speed;
		};
		
		self.stopRight = stopRight = function() {
			if (speedX > 0) {
				speedX = 0;
			}
		};
		
		self.moveUp = moveUp = function(speed) {
			speedY = -speed;
		};
		
		self.stopUp = stopUp = function() {
			if (speedY < 0) {
				speedY = 0;
			}
		};
		
		self.moveDown = moveDown = function(speed) {
			speedY = speed;
		};
		
		self.stopDown = stopDown = function() {
			if (speedY > 0) {
				speedY = 0;
			}
		};
		
		self.moveTo = moveTo = function(params) {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//REQUIRED: params.speed
		};
		
		self.rotate = rotate = function() {
			
		};
		
		self.stopRotation = stopRotation = function() {
			
		};
		
		self.stop = stop = function() {
			
		};
		
		self.fadeIn = fadeIn = function() {
			
		};
		
		self.fadeOut = fadeOut = function() {
			
		};
		
		self.stopFading = stopFading = function() {
			
		};
		
		self.hide = hide = function() {
			
		};
		
		self.show = show = function() {
			
		};
		
		self.addCollider = addCollider = function() {
			
		};
		
		self.addTouchArea = addTouchArea = function() {
			
		};
		
		self.checkCollision = checkCollision = function() {
			
		};
		
		self.checkTouch = checkTouch = function() {
			
		};
		
		self.step = step = function(deltaTime) {
			
			if (accelX !== 0) {
				speedX += accelX * deltaTime / 1000;
			}
			
			if (maxSpeedX !== undefined) {
				
				if (maxSpeedX >= 0 && speedX > maxSpeedX) {
					speedX = maxSpeedX;
				}
				
				if (maxSpeedX < 0 && speedX < maxSpeedX) {
					speedX = maxSpeedX;
				}
			}
			
			if (accelY !== 0) {
				speedY += accelY * deltaTime / 1000;
			}
			
			if (maxSpeedY !== undefined) {
				
				if (maxSpeedY >= 0 && speedX > maxSpeedY) {
					speedX = maxSpeedY;
				}
				
				if (maxSpeedY < 0 && speedX < maxSpeedY) {
					speedX = maxSpeedY;
				}
			}
			
			if (speedX !== 0) {
				x += speedX * deltaTime / 1000;
			}
			
			if (speedY !== 0) {
				y += speedY * deltaTime / 1000;
			}
		};
		
		self.draw = draw = function(context, realScaleX, realScaleY, realX, realY, realAngle, realAlpha) {
			// to implement.
		};
	}
});
