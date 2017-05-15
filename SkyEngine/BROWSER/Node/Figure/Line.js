/*
 * 선 노드
 */
SkyEngine.Line = CLASS({
	
	preset : () => {
		return SkyEngine.Figure;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.startX
		//REQUIRED: params.startY
		//REQUIRED: params.endX
		//REQUIRED: params.endY
		
		let startX = params.startX;
		let startY = params.startY;
		let endX = params.endX;
		let endY = params.endY;
		
		let checkLineLine = SkyEngine.Util.Collision.checkLineLine;
		
		let setStartX = self.setStartX = (_startX) => {
			startX = _startX;
		};
		
		let getStartX = self.getStartX = () => {
			return startX;
		};
		
		let setStartY = self.setStartY = (_startY) => {
			startY = _startY;
		};
		
		let getStartY = self.getStartY = () => {
			return startY;
		};
		
		let setEndX = self.setEndX = (_endX) => {
			endX = _endX;
		};
		
		let getEndX = self.getEndX = () => {
			return endX;
		};
		
		let setEndY = self.setEndY = (_endY) => {
			endY = _endY;
		};
		
		let getEndY = self.getEndY = () => {
			return endY;
		};
		
		let checkArea;
		OVERRIDE(self.checkArea, (origin) => {
			
			checkArea = self.checkArea = (area) => {
				// area가 같은 Line인 경우 작동
				
				if (area.type === SkyEngine.Line) {
					
					if (checkLineLine(
						
						area.getRealX(),
						area.getRealY(),
						area.getStartX(),
						area.getStartY(),
						area.getEndX(),
						area.getEndY(),
						area.getRealScaleX(),
						area.getRealScaleY(),
						area.getRealRadian(),
						
						self.getRealX(),
						self.getRealY(),
						startX,
						startY,
						endX,
						endY,
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
				
				context.moveTo(startX, startY);
				context.lineTo(endX, endY);
				
				origin(context);
			};
		});
		
		let drawArea;
		OVERRIDE(self.drawArea, (origin) => {
			
			drawArea = self.drawArea = (context) => {
				
				context.moveTo(startX, startY);
				context.lineTo(endX, endY);
				
				origin(context);
			};
		});
	}
});
