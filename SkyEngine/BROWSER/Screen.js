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
		
		// loop
		loop,
		
		// registered nodes
		registeredNodes = {},
		
		// register node.
		registerNode,
		
		// unregister node.
		unregisterNode;
		
		loop = LOOP(function(deltaTime) {
			
			var
			// canvas width
			canvasWidth = canvas.getWidth(),
			
			// canvas height
			canvasHeight = canvas.getHeight();
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			self.draw(context, deltaTime, canvasWidth / 2, canvasHeight / 2);
		});
		
		EVENT('resize', RAR(function() {
			
			canvas.setSize({
				width : WIN_WIDTH(),
				height : WIN_HEIGHT()
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
