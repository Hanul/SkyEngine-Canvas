SkyEngineShowcase.FilterTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// rect
		rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : 'green'
		}).appendTo(SkyEngine.Screen),
		
		// circle
		circle = SkyEngine.Circle({
			width : 300,
			height : 200,
			color : 'yellow'
		}).appendTo(SkyEngine.Screen),
		
		// image
		image = SkyEngine.Image({
			src : SkyEngineShowcase.R('robot/idle1.png'),
			scale : 0.2
		}).appendTo(SkyEngine.Screen);
		
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
		
		SkyEngine.Screen.setFilter('grayscale(100%)');
		
		DELAY(3, function() {
			SkyEngine.Screen.removeFilter();
		});
		
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
