/**
 * HTML canvas 태그와 대응되는 클래스
 */
SkyEngine.Screen = OBJECT({
	
	preset : function() {
		'use strict';

		return SkyEngine.Node;
	},
	
	init : function(inner, self) {
		'use strict';
		
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
		
		// registered nodes
		registeredNodes = {},
		
		// step all.
		stepAll,
		
		// draw all.
		drawAll,
		
		// register node.
		registerNode,
		
		// unregister node.
		unregisterNode;
		
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
		
		stepAll = function(node, deltaTime) {
			
			node.step(deltaTime);
			
			node.getChildren().forEach(function(childNode) {
				stepAll(childNode, deltaTime);
			});
		};
		
		drawAll = function(node, context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha) {
			
			var
			// radian
			radian = realAngle * Math.PI / 180,
			
			// plus x
			plusX = node.getX() * realScaleX,
			
			// plus y
			plusY = node.getY() * realScaleY;
			
			realX += plusX * Math.cos(radian) - plusY * Math.sin(radian);
			realY += plusX * Math.sin(radian) + plusY * Math.cos(radian);
			
			realScaleX *= node.getScaleX();
			realScaleY *= node.getScaleY();
			
			realAngle += node.getAngle();
			
			radian = realAngle * Math.PI / 180;
			
			realAlpha *= node.getAlpha();
			
			context.translate(realX, realY);
			context.rotate(radian);
			
			context.globalAlpha = realAlpha;
			
			context.scale(realScaleX, realScaleY);
			
			node.draw(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha);
			
			context.scale(1 / realScaleX, 1 / realScaleY);
			
			context.rotate(-radian);
			context.translate(-realX, -realY);
			
			context.globalAlpha = 1;
			
			node.getChildren().forEach(function(childNode) {
				drawAll(childNode, context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha);
			});
		};
		
		loop = LOOP(function(_deltaTime) {
			
			deltaTime = _deltaTime;
			
			stepAll(self, deltaTime);
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			drawAll(self, context, canvasWidth / 2, canvasHeight / 2, self.getScaleX(), self.getScaleY(), self.getAngle(), self.getAlpha());
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
		
		self.registerNode = registerNode = function() {
			
		};
		
		self.unregisterNode = unregisterNode = function() {
			
		};
	}
});
