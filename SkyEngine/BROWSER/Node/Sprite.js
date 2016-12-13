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
		//OPTIONAL: params.src
		//OPTIONAL: params.srcs
		//OPTIONAL: params.spriteWidth
		//OPTIONAL: params.spriteHeight
		//OPTIONAL: params.frameCount
		//OPTIONAL: params.fps
		//OPTIONAL: params.scale
		
		var
		// src
		src = params.src,
		
		// srcs
		srcs = params.srcs,
		
		// sprite width
		spriteWidth = params.spriteWidth,
		
		// sprite height
		spriteHeight = params.spriteHeight,
		
		// frame count
		frameCount = params.frameCount,
		
		// fps
		fps = params.fps,
		
		// scale
		scale = params.scale,
		
		// img
		img,
		
		// imgs
		imgs,
		
		// width
		width,
		
		// height
		height,
		
		// frame
		frame = 0,
		
		// set src.
		setSrc,
		
		// add src.
		addSrc,
		
		// step.
		step,
		
		// draw.
		draw;
		
		if (fps === undefined) {
			fps = 0;
		}
		
		if (scale === undefined) {
			scale = 1;
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
		
		if (src !== undefined) {
			setSrc(src);
		}
		
		self.addSrc = addSrc = function(src) {
			
			var
			// img
			img = new Image();
			
			if (imgs === undefined) {
				imgs = [];
				
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
						frameCount = 1;
					} else {
						frameCount += 1;
					}
					
					self.fireEvent('load');
				};
			}
			
			else {
				
				img.onload = function() {
					
					if (frameCount === undefined) {
						frameCount = 1;
					} else {
						frameCount += 1;
					}
				};
			}
			
			img.src = src;
			
			imgs.push(img);
		};
		
		if (srcs !== undefined) {
			EACH(srcs, addSrc);
		}
		
		OVERRIDE(self.step, function(origin) {
			
			self.step = step = function(deltaTime) {
				
				if (fps > 0) {
					frame += fps * deltaTime / 1000;
				}
				
				if (frameCount !== undefined) {
					if (frame >= frameCount) {
						frame = 0;
					}
				}
				
				origin(deltaTime);
			};
		});
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, realX, realY, realAlpha) {
				
				var
				// x frame
				xFrame,
				
				// y frame
				yFrame;
				
				if (imgs !== undefined) {
					if (frameCount !== undefined) {
						context.drawImage(
							imgs[Math.floor(frame)],
							realX - width * scale / 2,
							realY - height * scale / 2,
							width * scale,
							height * scale);
					}
				}
				
				else if (
				width !== undefined && height !== undefined &&
				spriteWidth !== undefined && spriteHeight !== undefined) {
					
					context.drawImage(
						img,
						spriteWidth * Math.floor(frame % (width / spriteWidth)), spriteHeight * Math.floor(frame / (width / spriteWidth)),
						spriteWidth, spriteHeight,
						realX - spriteWidth * scale / 2, realY - spriteHeight * scale / 2,
						spriteWidth * scale,
						spriteHeight * scale);
				}
				
				origin(context, realX, realY, realAlpha);
			};
		});
	}
});
