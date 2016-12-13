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
					top : 5
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
		}
		
		drawAll = function(node, context, realX, realY, realAlpha) {
			
			realX += node.getX();
			realY += node.getY();
			
			if (node.getAlpha() < 1) {
				realAlpha *= node.getAlpha();
			}
			
			if (realAlpha < 1) {
				context.globalAlpha = realAlpha;
			}
			
			node.draw(context, realX, realY, realAlpha);
			
			node.getChildren().forEach(function(childNode) {
				drawAll(childNode, context, realX, realY, realAlpha);
			});
			
			if (context.globalAlpha < 1) {
				context.globalAlpha = 1;
			}
		}
		
		loop = LOOP(function(_deltaTime) {
			
			deltaTime = _deltaTime;
			
			stepAll(self, deltaTime);
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			drawAll(self, context, canvasWidth / 2, canvasHeight / 2, self.getAlpha());
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
