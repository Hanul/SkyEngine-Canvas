/*
 * 배경 노드
 */
SkyEngine.Background = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.src
		//OPTIONAL: params.isNotToRepeatX
		//OPTIONAL: params.isNotToRepeatY
		
		let src = params.src;
		let isNotToRepeatX = params.isNotToRepeatX;
		let isNotToRepeatY = params.isNotToRepeatY;
		
		let width;
		let height;
		
		let img = new Image();
		
		img.onload = () => {
			
			width = img.width;
			height = img.height;
			
			img.onload = undefined;
			
			self.fireEvent('load');
		};
		
		img.src = src;
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context) => {
				
				if (width !== undefined) {
					
					if (isNotToRepeatX === true && isNotToRepeatY === true) {
						
						context.drawImage(
							img,
							-width / 2,
							-height / 2,
							width,
							height);
					}
					
					else if (isNotToRepeatX === true) {
						
						let _y = -height / 2;
						
						let followY = SkyEngine.Screen.getFollowY() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						while (followY - halfScreenHeight < _y) {
							_y -= height;
						}
						
						while (_y < followY + halfScreenHeight) {
							
							context.drawImage(
								img,
								-width / 2,
								_y,
								width,
								height);
							
							_y += height;
						}
					}
					
					else if (isNotToRepeatY === true) {
						
						let _x = -width / 2;
						
						let followX = SkyEngine.Screen.getFollowX() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						
						let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						
						while (followX - halfScreenWidth < _x) {
							_x -= width;
						}
						
						while (_x < followX + halfScreenWidth) {
							
							context.drawImage(
								img,
								_x,
								-height / 2,
								width,
								height);
							
							_x += width;
						}
					}
					
					else {
						
						let _x = -width / 2;
						let _y = -height / 2;
						
						let followX = SkyEngine.Screen.getFollowX() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						let followY = SkyEngine.Screen.getFollowY() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						while (followX - halfScreenWidth < _x) {
							_x -= width;
						}
						
						while (followY - halfScreenHeight < _y) {
							_y -= height;
						}
						
						while (_y < followY + halfScreenHeight) {
							
							let _x2 = _x;
							
							while (_x2 < followX + halfScreenWidth) {
								
								context.drawImage(
									img,
									_x2,
									_y,
									width,
									height);
								
								_x2 += width;
							}
							
							_y += height;
						}
					}
				}
				
				origin(context);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				img.onload = undefined;
				img = undefined;
				
				origin();
			};
		});
		
		let clone;
		OVERRIDE(self.clone, (origin) => {
			
			clone = self.clone = (appendParams) => {
				//OPTIONAL: appendParams
				
				let newParams = {
					src : src
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
