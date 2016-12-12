SkyEngineShowcase.MAIN = METHOD({

	run : function(params) {
		'use strict';
		
		var node1 = SkyEngine.Node().appendTo(SkyEngine.Screen);
		
		SkyEngine.Image({
			src : 'R/sample.png'
		}).appendTo(node1);
		
		SkyEngine.Sprite({
			src : 'R/sprite.png',
			spriteWidth : 128,
			spriteHeight : 128,
			fps : 1
		}).appendTo(node1);
	}
});
