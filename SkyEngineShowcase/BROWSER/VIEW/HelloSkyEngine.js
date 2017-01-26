SkyEngineShowcase.HelloSkyEngine = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// image
		image = SkyEngine.Image({
			src : SkyEngineShowcase.R('hello.png')
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', function() {
			
			image.remove();
			image = undefined;
		});
	}
});
