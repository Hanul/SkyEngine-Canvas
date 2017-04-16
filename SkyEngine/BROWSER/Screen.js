/*
 * 게임 화면 전체를 다루는 오브젝트
 */
SkyEngine.Screen = OBJECT({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self) => {
		
		var
		// wrapper
		wrapper = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0
			}
		}).appendTo(BODY),
		
		// canvas
		canvas = CANVAS().appendTo(wrapper),
		
		// context
		context = canvas.getContext('2d'),
		
		// canvas width
		canvasWidth,
		
		// canvas height
		canvasHeight,
		
		// fps dom
		fpsDom,
		
		// loop
		loop,
		
		// delta time
		deltaTime,
		
		// registered node map
		registeredNodeMap = {},
		
		// registered event node map
		registeredEventNodeMap = {},
		
		// step all.
		stepAll,
		
		// draw all.
		drawAll,
		
		// register node.
		registerNode,
		
		// unregister node.
		unregisterNode,
		
		// get registered nodes.
		getRegisteredNodes,
		
		// register event node.
		registerEventNode,
		
		// unregister event node.
		unregisterEventNode,
		
		// set filter.
		setFilter,
		
		// remove filter.
		removeFilter;
		
		self.registerNode = registerNode = function(node) {
			
			var
			// cls
			cls = node.type;
			
			while (cls !== undefined && cls !== CLASS) {
				
				if (registeredNodeMap[cls.id] === undefined) {
					registeredNodeMap[cls.id] = [];
				}
				
				registeredNodeMap[cls.id].push(node);
				
				cls = cls.mom;
			}
		};
		
		self.unregisterNode = unregisterNode = function(node) {
			
			var
			// cls
			cls = node.type;
			
			while (cls !== undefined && cls !== CLASS) {
				
				if (registeredNodeMap[cls.id] !== undefined) {
					
					REMOVE({
						array : registeredNodeMap[cls.id],
						value : node
					});
					
					if (registeredNodeMap[cls.id].length === 0) {
						delete registeredNodeMap[cls.id];
					}
				}
				
				cls = cls.mom;
			}
		};
		
		self.getRegisteredNodes = getRegisteredNodes = function(cls) {
			return registeredNodeMap[cls.id] === undefined ? [] : registeredNodeMap[cls.id];
		};
		
		self.registerEventNode = registerEventNode = function(eventName, node) {
			
			if (registeredEventNodeMap[eventName] !== undefined) {
				registeredEventNodeMap[eventName].push(node);
			}
		};
		
		self.unregisterEventNode = unregisterEventNode = function(eventName, node) {
			
			if (registeredEventNodeMap[eventName] !== undefined) {
				
				REMOVE({
					array : registeredEventNodeMap[eventName],
					value : node
				});
			}
		};
		
		self.setFilter = setFilter = function(filterStyle) {
			//REQUIRED: filterStyle
			
			canvas.addStyle({
				filter : filterStyle
			});
		};
		
		self.removeFilter = removeFilter = function() {
			setFilter('none');
		};
		
		
		if (CONFIG.isDevMode === true) {
			
			fpsDom = DIV({
				style : {
					position : 'fixed',
					left : 5,
					top : 5,
					fontSize : 12
				}
			}).appendTo(BODY);
			
			INTERVAL(0.1, function() {
				
				if (deltaTime !== undefined) {
					fpsDom.empty();
					fpsDom.append('FPS: ' + parseInt(1 / deltaTime * 1000));
				}
			});
		}
		
		EACH([
			'tap',
			'touchstart',
			'touchend'
		], function(eventName) {
			
			registeredEventNodeMap[eventName] = [];
			
			canvas.on(eventName, function(e) {
				
				EACH(registeredEventNodeMap[eventName], function(node) {
					
					if (node.checkTouch(e.getLeft(), e.getTop()) === true) {
						node.fireEvent(eventName);
					}
				});
				
				e.stop();
			});
		});
		
		stepAll = function(node, deltaTime) {
			
			node.step(deltaTime);
			
			node.getChildren().forEach(function(childNode) {
				stepAll(childNode, deltaTime);
			});
		};
		
		drawAll = function(node, context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) {
			
			var
			// plus x
			plusX = node.getX() * realScaleX,
			
			// plus y
			plusY = node.getY() * realScaleY,
			
			// plus center x
			plusCenterX = node.getCenterX() * realScaleX,
			
			// plus center y
			plusCenterY = node.getCenterY() * realScaleY,
			
			// sin
			sin = Math.sin(realRadian),
			
			// cos
			cos = Math.cos(realRadian),
			
			// next x
			nextX,
			
			// next y
			nextY;
			
			realX += plusX * cos - plusY * sin;
			realY += plusX * sin + plusY * cos;
			
			nextX = realX;
			nextY = realY;
			
			realScaleX *= node.getScaleX();
			realScaleY *= node.getScaleY();
			
			realRadian += node.getAngle() * Math.PI / 180;
			
			sin = Math.sin(realRadian);
			cos = Math.cos(realRadian);
			
			realX -= plusCenterX * cos - plusCenterY * sin;
			realY -= plusCenterX * sin + plusCenterY * cos;
			
			realAlpha *= node.getAlpha();
			
			if (node.checkIsHiding() !== true) {
				
				context.translate(realX, realY);
				context.rotate(realRadian);
				context.scale(realScaleX, realScaleY);
				context.globalAlpha = realAlpha;
				
				node.draw(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				
				context.globalAlpha = 1;
				context.scale(1 / realScaleX, 1 / realScaleY);
				context.rotate(-realRadian);
				context.translate(-realX, -realY);
				
				node.getChildren().forEach(function(childNode) {
					drawAll(childNode, context, nextX, nextY, realScaleX, realScaleY, realRadian, realAlpha);
				});
			}
		};
		
		loop = LOOP(function(_deltaTime) {
			
			deltaTime = _deltaTime;
			
			stepAll(self, deltaTime);
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			drawAll(self, context, canvasWidth / 2, canvasHeight / 2, self.getScaleX(), self.getScaleY(), self.getAngle() * Math.PI / 180, self.getAlpha());
		});
		
		EVENT('resize', RAR(function() {
			
			canvasWidth = WIN_WIDTH();
			canvasHeight = WIN_HEIGHT();
			
			canvas.setSize({
				width : canvasWidth,
				height : canvasHeight
			});
		}));
		
		self.on('remove', function() {
			loop.remove();
		});
	}
});
