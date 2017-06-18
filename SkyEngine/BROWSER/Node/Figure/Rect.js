/*
 * 사각형 노드
 */
SkyEngine.Rect = CLASS((cls) => {
	
	let findRaycastPoints = cls.findRaycastPoints = () => {
		
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
		}
	};
});
