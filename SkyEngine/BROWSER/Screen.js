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
		
		// loop
		loop,
		
		// registered nodes
		registeredNodes = {},
		
		// register node.
		registerNode,
		
		// unregister node.
		unregisterNode;
		
		loop = LOOP(function(deltaTime) {
			
			self.step(deltaTime);
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			self.draw(context, canvasWidth / 2, canvasHeight / 2);
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
