SkyEngineShowcase.FadingTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// character
		character,
		
		// delay
		delay;
		
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
			scale : 0.5
		}).appendTo(SkyEngine.Screen);
		
		character.fadeOut(1);
		
		inner.on('close', function() {
			
			character.remove();
			character = undefined;
		});
	}
});
