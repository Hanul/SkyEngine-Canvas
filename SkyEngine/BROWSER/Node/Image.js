/**
 * 이미지 노드
 */
SkyEngine.Image = CLASS({
	
	preset : function() {
		'use strict';

		return SkyEngine.Node;
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//REQUIRED: params.src
		//OPTIONAL: params.scale
		
		var
		// src
		src = params.src,
		
		// scale
		scale = params.scale,
		
		// img
		img,
		
		// width
		width,
		
		// height
		height,
		
		// set src.
		setSrc,
		
		// draw.
		draw;
		
		if (scale === undefined) {
			scale = 1;
		}
		
		self.setSrc = setSrc = function(_src) {
			src = _src;
			
			img = new Image();
			
			img.onload = function() {
				
				width = img.width;
				height = img.height;
				
				self.fireEvent('load');
			};
			
			img.src = src;
		};
		
		setSrc(src);
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, realX, realY, realAlpha) {
				
				context.drawImage(
					img,
					realX - width * scale / 2,
					realY - height * scale / 2,
					width * scale,
					height * scale);
				
				origin(context, realX, realY, realAlpha);
			};
		});
	}
});
