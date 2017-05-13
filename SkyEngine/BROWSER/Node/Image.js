/*
 * 이미지 노드
 */
SkyEngine.Image = CLASS((cls) => {
	
	const TRANSPARENT_ALPHA = 20;
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
	
		init : (inner, self, params) => {
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
			
			let src = params.src;
			
			let img;
			
			let imageCanvas = CANVAS({
				style : {
					display : 'none'
				}
			}).appendTo(BODY);
			
			let imageContext = imageCanvas.getContext('2d');
			
			let imageData;
			
			let width;
			let height;
			
			let setSrc = self.setSrc = (_src) => {
				src = _src;
				
				img = new Image();
				
				img.onload = () => {
					
					width = img.width;
					height = img.height;
					
					imageCanvas.setSize({
						width : width,
						height : height
					});
					imageContext.drawImage(img, 0, 0, width, height);
					imageData = imageContext.getImageData(0, 0, width, height).data;
					
					img.onload = undefined;
					
					self.fireEvent('load');
				};
				
				img.src = src;
			};
			
			setSrc(src);
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				draw = self.draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
					
					context.drawImage(
						img,
						-width / 2,
						-height / 2,
						width,
						height);
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					img = undefined;
					
					imageData = undefined;
					imageContext = undefined;
					imageCanvas.remove();
					
					origin();
				};
			});
			
			let checkPoint = self.checkPoint = (touchX, touchY) => {
				
				if (imageData === undefined) {
					return origin();
				}
				
				let tx = touchX - self.getRealX();
				let ty = touchY - self.getRealY();
				
				let cos = Math.cos(-self.getRealRadian());
				let sin = Math.sin(-self.getRealRadian());
				
				let px = cos * tx - sin * ty;
				let py = cos * ty + sin * tx;
				
				px = parseInt((px + width * self.getRealScaleX() / 2) / self.getRealScaleX());
				py = parseInt((py + height * self.getRealScaleY() / 2) / self.getRealScaleY());
				
				px >= 0 && px < width && py >= 0 && py < height && imageData[(py * width + px) * 4 + 3] > TRANSPARENT_ALPHA;
			};
		}
	};
});
