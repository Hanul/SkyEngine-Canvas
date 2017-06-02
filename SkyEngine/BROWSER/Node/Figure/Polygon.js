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
		
		let checkPointInPolygon = SkyEngine.Util.Collision.checkPointInPolygon;
		
		let checkLinePolygon = SkyEngine.Util.Collision.checkLinePolygon;
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
				
				return checkPointInPolygon(
					
					pointX,
					pointY,
					
					self.getDrawingX(),
					self.getDrawingY(),
					points,
					self.getRealScaleX(),
					self.getRealScaleY(),
					self.getRealSin(),
					self.getRealCos()) === true || origin(pointX, pointY) === true;
			};
		});
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (area) => {
				// area가 Line인 경우 작동
				// area가 Rect인 경우 작동
				// area가 Circle인 경우 작동
				// area가 같은 Polygon인 경우 작동
				
				if (area.type === SkyEngine.Line) {
					
					if (checkLinePolygon(
						
						area.getDrawingX(),
						area.getDrawingY(),
						area.getStartX(),
						area.getStartY(),
						area.getEndX(),
						area.getEndY(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealSin(),
						area.getRealCos(),
						
						self.getDrawingX(),
						self.getDrawingY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Rect) {
					
					if (checkRectPolygon(
						
						area.getDrawingX(),
						area.getDrawingY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealSin(),
						area.getRealCos(),
						
						self.getDrawingX(),
						self.getDrawingY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Circle) {
					
					if (checkCirclePolygon(
						
						area.getDrawingX(),
						area.getDrawingY(),
						area.getWidth(),
						area.getHeight(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealSin(),
						area.getRealCos(),
						
						self.getDrawingX(),
						self.getDrawingY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()
						
					) === true) {
						return true;
					}
				}
				
				else if (area.type === SkyEngine.Polygon) {
					
					if (checkPolygonPolygon(
						
						area.getDrawingX(),
						area.getDrawingY(),
						area.getPoints(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealSin(),
						area.getRealCos(),
						
						self.getDrawingX(),
						self.getDrawingY(),
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()
						
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
			
			drawArea = self.drawArea = (context) => {
				
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
		
		let clone;
		OVERRIDE(self.clone, (origin) => {
			
			clone = self.clone = (appendParams) => {
				//OPTIONAL: appendParams
				
				let newParams = {
					points : points
				};
				
				if (appendParams !== undefined) {
					EXTEND({
						origin : newParams,
						extend : appendParams
					});
				}
				
				return origin(newParams);
			};
		});
	}
});
