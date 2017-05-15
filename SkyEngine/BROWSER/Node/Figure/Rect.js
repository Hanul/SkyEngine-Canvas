/*
 * 사각형 노드
 */
SkyEngine.Rect = CLASS({
	
	preset : () => {
		return SkyEngine.Figure;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		
		let width = params.width;
		let height = params.height;
		
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
		
		let checkPoint;
		OVERRIDE(self.checkPoint, (origin) => {
			
			let checkPoint = self.checkPoint = (pointX, pointY) => {
				
				return checkPointRect(
					
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
				// area가 같은 Rect인 경우 작동
				
				if (area.type === SkyEngine.Rect) {
					
					if (checkRectRect(
						
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
						self.getRealRadian()) === true) {
						
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
				
				context.rect(-width / 2, -height / 2, width, height);
				
				origin(context);
			};
		});
		
		let drawArea;
		OVERRIDE(self.drawArea, (origin) => {
			
			drawArea = self.drawArea = (context) => {
				
				context.rect(-width / 2, -height / 2, width, height);
				
				origin(context);
			};
		});
	}
});
