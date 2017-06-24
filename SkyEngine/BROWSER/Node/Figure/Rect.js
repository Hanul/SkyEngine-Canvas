/*
 * 사각형 노드
 */
SkyEngine.Rect = CLASS((cls) => {
	
	let findRaycastPoints = cls.findRaycastPoints = (
		pointX, pointY,
		
		rectX, rectY,
		rectWidth, rectHeight,
		rectScaleX, rectScaleY,
		rectSin, rectCos) => {
		
		let rectPoint1X, rectPoint1Y;
		let rectPoint2X, rectPoint2Y;
		let rectPoint3X, rectPoint3Y;
		let rectPoint4X, rectPoint4Y;
		
		rectWidth *= rectScaleX;
		rectHeight *= rectScaleY;
		
		let cw = rectCos * rectWidth / 2;	let ch = rectCos * rectHeight / 2;
		let sw = -rectSin * rectWidth / 2;	let sh = -rectSin * rectHeight / 2;
		
		rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
		rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
		rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
		rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
		
		let xs = rectPoint1X - pointX;
		xs = xs * xs;
		
		let ys = rectPoint1Y - pointY;
		ys = ys * ys;
		
		let angle = Math.acos((rectPoint1X - pointX) / Math.sqrt(xs + ys));
		
		if (rectPoint1Y > pointY) {
		    angle = Math.PI + Math.PI - angle;
		}
		
		let minAngle = angle;
		let x1 = rectPoint1X;
		let y1 = rectPoint1Y;
		
		let maxAngle = angle;
		let x2 = rectPoint1X;
		let y2 = rectPoint1Y;
		
		xs = rectPoint2X - pointX;
		xs = xs * xs;
		
		ys = rectPoint2Y - pointY;
		ys = ys * ys;
		
		angle = Math.acos((rectPoint2X - pointX) / Math.sqrt(xs + ys));
		
		if (rectPoint2Y > pointY) {
		    angle = Math.PI + Math.PI - angle;
		}
		
		if (minAngle > angle) {
			minAngle = angle;
			x1 = rectPoint2X;
			y1 = rectPoint2Y;
		}
		
		if (maxAngle < angle) {
			maxAngle = angle;
			x2 = rectPoint2X;
			y2 = rectPoint2Y;
		}
		
		xs = rectPoint3X - pointX;
		xs = xs * xs;
		
		ys = rectPoint3Y - pointY;
		ys = ys * ys;
		
		angle = Math.acos((rectPoint3X - pointX) / Math.sqrt(xs + ys));
		
		if (rectPoint3Y > pointY) {
		    angle = Math.PI + Math.PI - angle;
		}
		
		if (minAngle > angle) {
			minAngle = angle;
			x1 = rectPoint3X;
			y1 = rectPoint3Y;
		}
		
		if (maxAngle < angle) {
			maxAngle = angle;
			x2 = rectPoint3X;
			y2 = rectPoint3Y;
		}
		
		xs = rectPoint4X - pointX;
		xs = xs * xs;
		
		ys = rectPoint4Y - pointY;
		ys = ys * ys;
		
		angle = Math.acos((rectPoint4X - pointX) / Math.sqrt(xs + ys));
		
		if (rectPoint4Y > pointY) {
		    angle = Math.PI + Math.PI - angle;
		}
		
		if (minAngle > angle) {
			minAngle = angle;
			x1 = rectPoint4X;
			y1 = rectPoint4Y;
		}
		
		if (maxAngle < angle) {
			maxAngle = angle;
			x2 = rectPoint4X;
			y2 = rectPoint4Y;
		}
		
		return [{
			x : x1,
			y : y1
		}, {
			x : x2,
			y : y2
		}];
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Figure;
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.width
			//REQUIRED: params.height
			
			let width = params.width;
			let height = params.height;
			
			let checkPointInRect = SkyEngine.Util.Collision.checkPointInRect;
			
			let checkLineRect = SkyEngine.Util.Collision.checkLineRect;
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
					
					return checkPointInRect(
						
						pointX,
						pointY,
						
						self.getDrawingX(),
						self.getDrawingY(),
						width,
						height,
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
					// area가 같은 Rect인 경우 작동
					
					if (area.type === SkyEngine.Line) {
						
						if (checkLineRect(
							
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
							width,
							height,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()) === true) {
							
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Rect) {
						
						if (checkRectRect(
							
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
							width,
							height,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()) === true) {
							
							return true;
						}
					}
					
					return origin(area);
				};
			});
			
			let checkOffScreen;
			OVERRIDE(self.checkOffScreen, (origin) => {
				
				checkOffScreen = self.checkOffScreen = (area) => {
					
					if (checkRectRect(
						
						0,
						0,
						SkyEngine.Screen.getWidth(),
						SkyEngine.Screen.getHeight(),
						1,
						1,
						0,
						1,
						
						self.getDrawingX(),
						self.getDrawingY(),
						width,
						height,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()) === true) {
						
						return true;
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
			
			let clone;
			OVERRIDE(self.clone, (origin) => {
				
				clone = self.clone = (appendParams) => {
					//OPTIONAL: appendParams
					
					let newParams = {
						width : width,
						height : height
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
			
			let findRaycastPoints = self.findRaycastPoints = (pointX, pointY) => {
				return cls.findRaycastPoints(
				pointX, pointY,
				
				self.getDrawingX(),
				self.getDrawingY(),
				width,
				height,
				self.getRealScaleX(),
				self.getRealScaleY(),
				self.getRealSin(),
				self.getRealCos());
			};
		}
	};
});
