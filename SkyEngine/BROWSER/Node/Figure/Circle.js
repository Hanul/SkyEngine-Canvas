/*
 * 원형 노드
 */
SkyEngine.Circle = CLASS({
	
	preset : () => {
		return SkyEngine.Figure;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		
		let width = params.width;
		let height = params.height;
		
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
		
		let checkPoint;
		OVERRIDE(self.checkPoint, (origin) => {
			
			let checkPoint = self.checkPoint = (pointX, pointY) => {
				
				return checkPointCircle(
					
					pointX,
					pointY,
					
					self.getRealX(),
					self.getRealY(),
					width,
					height,
					self.getRealScaleX(),
					self.getRealScaleY(),
					self.getRealRadian()) === true || origin(pointX, pointY) === true;
			};
		});
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (area) => {
				// area가 Rect인 경우 작동
				// area가 같은 Circle인 경우 작동
				
				if (area.type === SkyEngine.Rect) {
					
					if (checkRectCircle(
						
						area.getRealX(),
						area.getRealY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						width,
						height,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealRadian()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Circle) {
					
					if (checkCircleCircle(
						
						area.getRealX(),
						area.getRealY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						width,
						height,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealRadian()
						
					) === true) {
						return true;
					}
				}
				
				return origin(area);
			};
		});
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context) => {
				
				context.beginPath();
				
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				origin(context);
			};
		});
		
		let drawArea;
		OVERRIDE(self.drawArea, (origin) => {
			
			drawArea = self.drawArea = (context) => {
				
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				origin(context);
			};
		});
	}
});
