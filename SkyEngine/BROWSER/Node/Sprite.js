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
		//OPTIONAL: params
		
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		//OPTIONAL: params.speedX
		//OPTIONAL: params.speedY
		//OPTIONAL: params.accelX
		//OPTIONAL: params.accelY
		//OPTIONAL: params.minSpeedX
		//OPTIONAL: params.minSpeedY
		//OPTIONAL: params.maxSpeedX
		//OPTIONAL: params.maxSpeedY
		//OPTIONAL: params.toX
		//OPTIONAL: params.toY
		
		//OPTIONAL: params.scale
		//OPTIONAL: params.scaleX
		//OPTIONAL: params.scaleY
		//OPTIONAL: params.scalingSpeed
		//OPTIONAL: params.scalingSpeedX
		//OPTIONAL: params.scalingSpeedY
		//OPTIONAL: params.scalingAccel
		//OPTIONAL: params.scalingAccelX
		//OPTIONAL: params.scalingAccelY
		//OPTIONAL: params.minScalingSpeed
		//OPTIONAL: params.minScalingSpeedX
		//OPTIONAL: params.minScalingSpeedY
		//OPTIONAL: params.maxScalingSpeed
		//OPTIONAL: params.maxScalingSpeedX
		//OPTIONAL: params.maxScalingSpeedY
		//OPTIONAL: params.toScale
		//OPTIONAL: params.toScaleX
		//OPTIONAL: params.toScaleY
		
		//OPTIONAL: params.angle
		//OPTIONAL: params.rotationSpeed
		//OPTIONAL: params.rotationAccel
		//OPTIONAL: params.minRotationSpeed
		//OPTIONAL: params.maxRotationSpeed
		//OPTIONAL: params.toAngle
		
		//OPTIONAL: params.alpha
		//OPTIONAL: params.fadingSpeed
		//OPTIONAL: params.fadingAccel
		//OPTIONAL: params.minFadingSpeed
		//OPTIONAL: params.maxFadingSpeed
		//OPTIONAL: params.toAlpha
		
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		//OPTIONAL: params.src
		//OPTIONAL: params.srcs
		//OPTIONAL: params.spriteWidth
		//OPTIONAL: params.spriteHeight
		//OPTIONAL: params.frameCount
		//OPTIONAL: params.fps
		
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
		draw,
		
		// remove.
		remove;
		
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
			
			self.draw = draw = function(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha) {
				
				var
				// x frame
				xFrame,
				
				// y frame
				yFrame;
				
				if (imgs !== undefined) {
					if (frameCount !== undefined) {
						context.drawImage(
							imgs[Math.floor(frame)],
							-width / 2,
							-height / 2,
							width,
							height);
					}
				}
				
				else if (
				width !== undefined && height !== undefined &&
				spriteWidth !== undefined && spriteHeight !== undefined) {
					
					context.drawImage(
						img,
						spriteWidth * Math.floor(frame % (width / spriteWidth)), spriteHeight * Math.floor(frame / (width / spriteWidth)),
						spriteWidth, spriteHeight,
						-spriteWidth / 2, -spriteHeight / 2,
						spriteWidth,
						spriteHeight);
				}
				
				origin(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha);
			};
		});
		
		OVERRIDE(self.remove, function(origin) {
			
			self.remove = remove = function() {
				
				srcs = undefined;
				
				img = undefined;
				imgs = undefined;
				
				origin();
			};
		});
		
		// 사각형 충돌 체크
		// 원 충돌 체크
		// 이미지 충돌 체크
		// 스프라이트 충돌 체크
	}
});
