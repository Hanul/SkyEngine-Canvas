/**
 * HTML canvas 태그와 대응되는 클래스
 */
SkyEngine.Scene = CLASS({
	
	preset : function() {
		'use strict';

		return SkyEngine.Node;
	},
	
	init : function(inner, self, gl) {
		'use strict';
		//REQUIRED: gl
		
		var
		// loop
		loop = LOOP(function() {
			self.draw(gl);
		});
		
		self.on('remove', function() {
			loop.remove();
		})
	}
});
