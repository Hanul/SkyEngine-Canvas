SkyEngineShowcase.EventTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// rect
		rect = SkyEngine.Rect({
			x : -100,
			width : 60,
			height : 40,
			color : 'green',
			angle : 45,
			scale : 1.2,
			on : {
				touchstart : function() {
					console.log('This is Rect!');
				}
			}
		}).appendTo(SkyEngine.Screen),
		
		// circle
		circle = SkyEngine.Circle({
			width : 60,
			height : 40,
			color : 'yellow',
			angle : 45,
			scale : 1.2,
			on : {
				touchstart : function() {
					console.log('This is Circle!');
				}
			}
		}).appendTo(SkyEngine.Screen),
		
		// image
		image = SkyEngine.Image({
			x : 100,
			src : SkyEngineShowcase.R('robot/idle1.png'),
			scale : 0.2,
			angle : 45,
			on : {
				touchstart : function() {
					console.log('This is Image!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		rect.addTouchArea(rect);
		
		circle.addTouchArea(circle);
		
		/*// character
		character = SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png'),
				SkyEngineShowcase.R('robot/run5.png'),
				SkyEngineShowcase.R('robot/run6.png'),
				SkyEngineShowcase.R('robot/run7.png'),
				SkyEngineShowcase.R('robot/run8.png')
			],
			fps : 10,
			scale : 0.2
		}).appendTo(SkyEngine.Screen);*/
		
		inner.on('close', function() {
			
			rect.remove();
			rect = undefined;
			
			circle.remove();
			circle = undefined;
			
			image.remove();
			image = undefined;
			
			//character.remove();
			character = undefined;
		});
	}
});
