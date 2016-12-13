/**
 * 스프라이트 애니메이션 노드
 */
SkyEngine.Sprite = CLASS({
	
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
		//OPTIONAL: params.spriteWidth
		//OPTIONAL: params.spriteHeight
		//OPTIONAL: params.frameCount
		//OPTIONAL: params.fps
		
		var
		// src
		src = params.src,
		
		// sprite width
		spriteWidth = params.spriteWidth,
		
		// sprite height
		spriteHeight = params.spriteHeight,
		
		// frame count
		frameCount = params.frameCount,
		
		// fps
		fps = params.fps,
		
		// img
		img,
		
		// width
		width,
		
		// height
		height,
		
		// frame
		frame = 0,
		
		// set src.
		setSrc,
		
		// draw.
		draw;
		
		if (fps === undefined) {
			fps = 0;
		}
		
		self.setSrc = setSrc = function(_src) {
			src = _src;
			
			img = new Image();
			
			img.onload = function() {
				
				width = img.width;
				height = img.height;
				
				if (spriteWidth === undefined) {
					spriteWidth = width;
				}
				
				if (spriteHeight === undefined) {
					spriteHeight = height;
				}
				
				if (frameCount === undefined) {
					frameCount = width / spriteWidth * height / spriteHeight;
				}
				
				self.fireEvent('load');
			};
			
			img.src = src;
		};
		
		setSrc(src);
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, deltaTime, parentRealX, parentRealY) {
				
				var
				// x frame
				xFrame,
				
				// y frame
				yFrame;
				
				if (
				width !== undefined && height !== undefined &&
				spriteWidth !== undefined && spriteHeight !== undefined) {
					
					context.drawImage(
						img,
						spriteWidth * Math.floor(frame % (width / spriteWidth)), spriteHeight * Math.floor(frame / (width / spriteWidth)),
						spriteWidth, spriteHeight,
						parentRealX + self.getX() - spriteWidth / 2, parentRealY + self.getY() - spriteHeight / 2,
						spriteWidth, spriteHeight);
				}
				
				if (fps > 0) {
					frame += fps * 1 / deltaTime;
				}
				
				if (frameCount !== undefined) {
					if (frame > frameCount) {
						frame = 0;
					}
				}
				
				origin(context, deltaTime, parentRealX, parentRealY);
			};
		});
	}
});
