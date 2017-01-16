/**
 * 이미지 노드
 */
SkyEngine.Image = CLASS(function(cls) {
	'use strict';
	
	var
	// TRANSPARENT_ALPHA
	TRANSPARENT_ALPHA = 20;
	
	return {
		
		preset : function() {
	
			return SkyEngine.Node;
		},
	
		init : function(inner, self, params) {
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
			
			// polygon
			polygon,
			
			// width
			width,
			
			// height
			height,
			
			// set src.
			setSrc,
			
			// draw.
			draw,
			
			// remove.
			remove,
			
			// check point.
			checkPoint,
			
			// check collision.
			checkCollision;
			
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
					imageData = imageContext.getImageData(0, 0, width, height).data;
					
					polygon = SkyEngine.Util.ImageData.convertImageDataToPolygon(imageData, width);
					
					img.onload = undefined;
					//img.src = imageCanvas.getDataURL();
					
					self.fireEvent('load');
				};
				
				img.src = src;
			};
			
			setSrc(src);
			
			OVERRIDE(self.draw, function(origin) {
				
				self.draw = draw = function(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) {
					
					context.drawImage(
						img,
						-width / 2,
						-height / 2,
						width,
						height);
						
					if (polygon !== undefined) {
						context.beginPath();
						context.strokeStyle="red";
						context.lineWidth=2;
						context.moveTo(polygon[0].x-width / 2, polygon[0].y-height / 2);
						for (var i = 1; i < polygon.length; i++) {
							var point = polygon[i];
							context.lineTo(point.x-width / 2, point.y-height / 2);
						}
						context.closePath();
						context.stroke();
					}
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
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
			
			self.checkPoint = checkPoint = function(touchX, touchY) {
				
				if (imageData === undefined) {
					return origin();
				}
				
				var tx, ty, cos, sin, px, py;
				
				tx = touchX - self.getRealX();
				ty = touchY - self.getRealY();
				
				cos = Math.cos(-self.getRealRadian());
				sin = Math.sin(-self.getRealRadian());
				
				px = cos * tx - sin * ty;
				py = cos * ty + sin * tx;
				
				px = parseInt((px + width * self.getRealScaleX() / 2) / self.getRealScaleX());
				py = parseInt((py + height * self.getRealScaleY() / 2) / self.getRealScaleY());
				
				px >= 0 && px < width && py >= 0 && py < height && imageData[(py * width + px) * 4 + 3] > TRANSPARENT_ALPHA;
			};
			
			self.checkCollision = checkCollision = function(target) {
				// target이 Rect인 경우 작동
				// target이 Circle인 경우 작동
				// target이 같은 Image인 경우 작동
				
				// to implement.
				return false;
			};
		}
	};
});
