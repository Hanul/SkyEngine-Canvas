/*
 * 원형 노드
 */
SkyEngine.Circle = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		
		let width = params.width;
		let height = params.height;
		let color = params.color;
		let border = params.border;
		
		let borderPixel;
		let borderStyle;
		let borderColor;
		
		if (border !== undefined) {
			let split = border.split(' ');
			borderPixel = INTEGER(split[0]);
			borderStyle = split[1];
			borderColor = split[2];
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
			
			draw = self.draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
				
				context.beginPath();
				
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				if (color !== undefined) {
					context.fillStyle = color;
					context.fill();
				}
				
				if (border !== undefined) {
					context.lineWidth = borderPixel;
					context.strokeStyle = borderColor;
					
					if (borderStyle === 'dashed') {
						context.setLineDash([5]);
					} else if (borderStyle === 'dotted') {
						context.setLineDash([2]);
					}
					
					context.stroke();
				}
				
				context.closePath();
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
			};
		});
		
		let drawArea;
		OVERRIDE(self.drawArea, (origin) => {
			
			drawArea = self.drawArea = (context, realX, realY, realScaleX, realScaleY, realRadian, color) => {
				
				context.beginPath();
				
				context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
				
				context.strokeStyle = color;
				context.stroke();
				
				context.closePath();
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, color);
			};
		});
	}
});
