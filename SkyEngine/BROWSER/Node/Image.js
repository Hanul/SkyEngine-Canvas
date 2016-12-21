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
		
		//REQUIRED: params.src
		
		var
		// src
		src = params.src,
		
		// img
		img,
		
		// image canvas
		imageCanvas = CANVAS({
			style : {
				display : 'none'
			}
		}).appendTo(BODY),
		
		// image context
		imageContext = imageCanvas.getContext('2d'),
		
		// image data
		imageData,
		
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
				
				imageCanvas.setSize({
					width : width,
					height : height
				});
				imageContext.drawImage(img, 0, 0, width, height);
				imageData = imageContext.getImageData(0, 0, width, height);
				
				img.onload = undefined;
				//img.src = imageCanvas.getDataURL();
				
				self.fireEvent('load');
			};
			
			img.src = src;
		};
		
		setSrc(src);
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha) {
				
				context.drawImage(
					img,
					-width / 2,
					-height / 2,
					width,
					height);
				
				origin(context, realX, realY, realScaleX, realScaleY, realAngle, realAlpha);
			};
		});
		
		OVERRIDE(self.remove, function(origin) {
			
			self.remove = remove = function() {
				
				img = undefined;
				
				imageData = undefined;
				imageContext = undefined;
				imageCanvas.remove();
				
				origin();
			};
		});
		
		// 사각형 충돌 체크
		// 원 충돌 체크
		// 이미지 충돌 체크
	}
});
