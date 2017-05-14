/*
 * 폴리곤 노드
 */
SkyEngine.Polygon = CLASS({
	
	preset : () => {
		return SkyEngine.Figure;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.points
		
		let points = params.points
		
		let checkPointPolygon = SkyEngine.Util.Collision.checkPointPolygon;
		let checkRectPolygon = SkyEngine.Util.Collision.checkRectPolygon;
		let checkCirclePolygon = SkyEngine.Util.Collision.checkCirclePolygon;
		let checkPolygonPolygon = SkyEngine.Util.Collision.checkPolygonPolygon;
		
		let getPoints = self.getPoints = () => {
			return points;
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
				
				return checkPointPolygon(
					
					pointX,
					pointY,
					
					self.getRealX(),
					self.getRealY(),
					points,
					self.getRealScaleX(),
					self.getRealScaleY(),
					self.getRealRadian()) === true || origin(pointX, pointY) === true;
			};
		});
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (area) => {
				// area가 Rect인 경우 작동
				// area가 Circle인 경우 작동
				// area가 같은 Polygon인 경우 작동
				
				if (area.type === SkyEngine.Rect) {
					
					if (checkRectPolygon(
						
						area.getRealX(),
						area.getRealY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealRadian()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Circle) {
					
					if (checkCirclePolygon(
						
						area.getRealX(),
						area.getRealY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealRadian()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Polygon) {
					
					if (checkPolygonPolygon(
						
						area.getRealX(),
						area.getRealY(),
						area.getPoints(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						points,
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
				
				if (points.length > 0) {
					
					context.moveTo(points[0].x, points[0].y);
					
					for (let i = 1; i < points.length; i += 1) {
						let point = points[i];
						context.lineTo(point.x, point.y);
					}
					
					context.lineTo(points[0].x, points[0].y);
				}
				
				origin(context);
			};
		});
		
		let drawArea;
		OVERRIDE(self.drawArea, (origin) => {
			
			drawArea = self.drawArea = (context, color) => {
					
				context.beginPath();
				
				if (points.length > 0) {
					
					context.moveTo(points[0].x, points[0].y);
					
					for (let i = 1; i < points.length; i += 1) {
						let point = points[i];
						context.lineTo(point.x, point.y);
					}
					
					context.lineTo(points[0].x, points[0].y);
				}
				
				origin(context, color);
			};
		});
	}
});
