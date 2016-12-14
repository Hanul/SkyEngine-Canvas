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
		
		var
		// src
		src = params.src,
		
		// img
		img,
		
		// width
		width,
		
		// height
		height,
		
		// set src.
		setSrc,
		
		// draw.
		draw,
		
		// remove.
		remove;
		
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
			
			self.draw = draw = function(context, realScaleX, realScaleY, realX, realY, realAngle, realAlpha) {
				
				context.drawImage(
					img,
					-width * realScaleX / 2,
					-height * realScaleY / 2,
					width * realScaleX,
					height * realScaleY);
				
				origin(context, realScaleX, realScaleY, realX, realY, realAngle, realAlpha);
			};
		});
		
		OVERRIDE(self.remove, function(origin) {
			
			self.remove = remove = function() {
				
				img = undefined;
				
				origin();
			};
		});
		
		// 사각형 충돌 체크
		// 원 충돌 체크
		// 이미지 충돌 체크
	}
});
