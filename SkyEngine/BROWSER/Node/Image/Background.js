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
		//OPTIONAL: params.cameraFollowRatio
		
		let src = params.src;
		let isNotToRepeatX = params.isNotToRepeatX;
		let isNotToRepeatY = params.isNotToRepeatY;
		let cameraFollowRatio = params.cameraFollowRatio;
		
		if (cameraFollowRatio === undefined) {
			cameraFollowRatio = 0;
		}
		
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
		
		let beforeCameraFollowX;
		let beforeCameraFollowY;
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				if (cameraFollowRatio !== 1) {
					
					let cameraFollowX = SkyEngine.Screen.getCameraFollowX();
					let cameraFollowY = SkyEngine.Screen.getCameraFollowY();
					
					if (beforeCameraFollowX !== undefined) {
						self.setX(self.getX() + (cameraFollowX - beforeCameraFollowX) * (1 - cameraFollowRatio) / self.getRealScaleX());
					}
					
					if (beforeCameraFollowY !== undefined) {
						self.setY(self.getY() + (cameraFollowY - beforeCameraFollowY) * (1 - cameraFollowRatio) / self.getRealScaleY());
					}
					
					beforeCameraFollowX = cameraFollowX;
					beforeCameraFollowY = cameraFollowY;
				}
				
				origin(deltaTime);
			};
		});
		
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
						
						let cameraFollowY = SkyEngine.Screen.getCameraFollowY() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						while (cameraFollowY - halfScreenHeight < _y + self.getRealY()) {
							_y -= height;
						}
						
						while (_y < cameraFollowY + halfScreenHeight) {
							
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
						
						let cameraFollowX = SkyEngine.Screen.getCameraFollowX() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						
						let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						
						while (cameraFollowX - halfScreenWidth < _x + self.getRealX()) {
							_x -= width;
						}
						
						while (_x < cameraFollowX + halfScreenWidth) {
							
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
						
						let cameraFollowX = SkyEngine.Screen.getCameraFollowX() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						let cameraFollowY = SkyEngine.Screen.getCameraFollowY() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
						let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
						
						while (cameraFollowX - halfScreenWidth < _x) {
							_x -= width;
						}
						
						while (cameraFollowY - halfScreenHeight < _y) {
							_y -= height;
						}
						
						while (_y < cameraFollowY + halfScreenHeight) {
							
							let _x2 = _x;
							
							while (_x2 < cameraFollowX + halfScreenWidth) {
								
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
	}
});
