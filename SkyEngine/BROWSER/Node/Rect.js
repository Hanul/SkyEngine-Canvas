/*
 * 사각형 노드
 */
SkyEngine.Rect = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		
		//OPTIONAL: params.x					x 좌표
		//OPTIONAL: params.y					y 좌표
		//OPTIONAL: params.z					노드의 드로우 순서를 결정하기 위한 z 인덱스
		//OPTIONAL: params.speedX				x 좌표 이동 속도
		//OPTIONAL: params.speedY				y 좌표 이동 속도
		//OPTIONAL: params.accelX				x 좌표 이동 가속도
		//OPTIONAL: params.accelY				y 좌표 이동 가속도
		//OPTIONAL: params.minSpeedX			x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.minSpeedY			y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.maxSpeedX			x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.maxSpeedY			y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.toX					x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
		//OPTIONAL: params.toY					y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
		
		//OPTIONAL: params.scale				배율
		//OPTIONAL: params.scaleX				x 배율
		//OPTIONAL: params.scaleY				y 배율
		//OPTIONAL: params.scalingSpeed			배율이 커지는 속도
		//OPTIONAL: params.scalingSpeedX		x 배율이 커지는 속도
		//OPTIONAL: params.scalingSpeedY		y 배율이 커지는 속도
		//OPTIONAL: params.scalingAccel			배율이 커지는 가속도
		//OPTIONAL: params.scalingAccelX		x 배율이 커지는 가속도
		//OPTIONAL: params.scalingAccelY		y 배율이 커지는 가속도
		//OPTIONAL: params.minScalingSpeed		배율이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedX		x 배율이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedY		y 배율이 커지는 최소 속도
		//OPTIONAL: params.maxScalingSpeed		배율이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedX		x 배율이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedY		y 배율이 커지는 최대 속도
		//OPTIONAL: params.toScale				배율이 커지는 목적지
		//OPTIONAL: params.toScaleX				x 배율이 커지는 목적지
		//OPTIONAL: params.toScaleY				y 배율이 커지는 목적지
		
		//OPTIONAL: params.angle				회전 각도
		//OPTIONAL: params.rotationSpeed		회전 속도
		//OPTIONAL: params.rotationAccel		회전 가속도
		//OPTIONAL: params.minRotationSpeed		최소 회전 속도
		//OPTIONAL: params.maxRotationSpeed		최대 회전 속도
		//OPTIONAL: params.toAngle				회전 각도 목적지
		
		//OPTIONAL: params.alpha				알파 값
		//OPTIONAL: params.fadingSpeed			페이드 속도
		//OPTIONAL: params.fadingAccel			페이드 가속도
		//OPTIONAL: params.minFadingSpeed		최소 페이드 속도
		//OPTIONAL: params.maxFadingSpeed		최대 페이드 속도
		//OPTIONAL: params.toAlpha				페이드 알파 값 목적지
		
		//OPTIONAL: params.collider				충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.touchArea			터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.c					자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on					이벤트
		
		//OPTIONAL: params.width				가로 크기
		//OPTIONAL: params.height				세로 크기
		//OPTIONAL: params.color				색상
		
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
		
		let checkPointRect = SkyEngine.Util.Collision.checkPointRect;
		let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
		
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
		
		let setColor = self.setColor = (color) => {
			color = _color;
		};
		
		let getColor = self.getColor = () => {
			return color;
		};
		
		let checkPoint = self.checkPoint = (touchX, touchY) => {
			
			return checkPointRect(
				touchX,
				touchY,
				self.getRealX(),
				self.getRealY(),
				width * self.getRealScaleX(),
				height * self.getRealScaleY(),
				self.getRealRadian());
		};
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (collider) => {
				// collider이 같은 Rect인 경우 작동
				
				if (collider.type === SkyEngine.Rect) {
					
					if (checkRectRect(
						self.getRealX(),
						self.getRealY(),
						width * self.getRealScaleX(),
						height * self.getRealScaleY(),
						self.getRealRadian(),
						collider.getRealX(),
						collider.getRealY(),
						collider.getWidth() * collider.getRealScaleX(),
						collider.getHeight() * collider.getRealScaleY(),
						collider.getRealRadian()) === true) {
						
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
				context.rect(-width / 2, -height / 2, width, height);
				
				context.fillStyle = color;
				context.fill();
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
			};
		});
	}
});
