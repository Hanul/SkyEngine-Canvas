/*
 * 원형 노드
 */
SkyEngine.Circle = CLASS({
	
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
		
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//OPTIONAL: params.color
		
		let width;
		let height;
		let color;
		
		if (params !== undefined) {
			width = params.width;
			height = params.height;
			color = params.color;
		}
		
		if (width === undefined) {
			width = 0;
		}
		
		if (height === undefined) {
			height = 0;
		}
		
		if (color === undefined) {
			color = '#000';
		}
		
		let checkPointCircle = SkyEngine.Util.Collision.checkPointCircle;
		let checkRectCircle = SkyEngine.Util.Collision.checkRectCircle;
		let checkCircleCircle = SkyEngine.Util.Collision.checkCircleCircle;
		
		let setWidth = self.setWidth = (_width) => {
			width = _width;
		};
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let setHeight = self.setHeight = (_height) => {
			height = _height;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
		
		let checkPoint = self.checkPoint = (touchX, touchY) => {
			
			return checkPointCircle(
				touchX,
				touchY,
				self.getRealX(),
				self.getRealY(),
				width * self.getRealScaleX(),
				height * self.getRealScaleY(),
				self.getRealRadian()
			);
		};
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (collider) => {
				// target이 Rect인 경우 작동
				// target이 같은 Circle인 경우 작동
				
				if (collider.type === SkyEngine.Rect) {
					
					if (checkRectCircle(
						collider.getRealX(), collider.getRealY(), collider.getWidth() * collider.getRealScaleX(), collider.getHeight() * collider.getRealScaleY(), collider.getRealRadian(),
						self.getRealX(), self.getRealY(), width * self.getRealScaleX(), height * self.getRealScaleY(), self.getRealRadian()
					) === true) {
						return true;
					}
				}
				
				else if (collider.type === SkyEngine.Circle) {
					
					if (checkCircleCircle(
						self.getRealX(), self.getRealY(), width * self.getRealScaleX(), height * self.getRealScaleY(), self.getRealRadian(),
						collider.getRealX(), collider.getRealY(), collider.getWidth() * collider.getRealScaleX(), collider.getHeight() * collider.getRealScaleY(), collider.getRealRadian()
					) === true) {
						return true;
					}
				}
				
				return origin();
			};
		});
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
				
				context.beginPath();
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				context.fillStyle = color;
				context.fill();
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
			};
		});
	}
});
