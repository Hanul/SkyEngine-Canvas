/*
 * 이미지 노드
 */
SkyEngine.Image = CLASS((cls) => {
	
	const TRANSPARENT_ALPHA = 20;
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			//OPTIONAL: params.cropTop
			//OPTIONAL: params.cropRight
			//OPTIONAL: params.cropBottom
			//OPTIONAL: params.cropLeft
			
			let src = params.src;
			
			let cropTop = params.cropTop;
			let cropRight = params.cropRight;
			let cropBottom = params.cropBottom;
			let cropLeft = params.cropLeft;
			
			if (cropTop === undefined) {
				cropTop = 0;
			}
			if (cropRight === undefined) {
				cropRight = 0;
			}
			if (cropBottom === undefined) {
				cropBottom = 0;
			}
			if (cropLeft === undefined) {
				cropLeft = 0;
			}
			
			let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
			
			let imageData;
			let isImageDataLoading = false;
			
			let polygonPoints;
			
			let width;
			let height;
			
			let img;
			
			let setSrc = self.setSrc = (_src) => {
				src = _src;
				
				let tempImg = new Image();
				
				if (img === undefined) {
					img = tempImg;
				}
				
				tempImg.onload = () => {
					
					width = tempImg.width;
					height = tempImg.height;
					
					tempImg.onload = undefined;
					
					img = tempImg;
					
					self.fireEvent('load');
				};
				
				tempImg.src = src;
			};
			
			setSrc(src);
			
			let checkPoint;
			OVERRIDE(self.checkPoint, (origin) => {
				
				checkPoint = self.checkPoint = (x, y) => {
					
					if (imageData === undefined) {
						
						if (isImageDataLoading !== true) {
							
							let tempImg = new Image();
							
							tempImg.onload = () => {
								
								let width = tempImg.width;
								let height = tempImg.height;
								
								let imageCanvas = CANVAS({
									style : {
										display : 'none'
									},
									width : width,
									height : height
								}).appendTo(BODY);
								
								let imageContext = imageCanvas.getContext('2d');
								imageContext.drawImage(tempImg, 0, 0, width, height);
								
								imageData = imageContext.getImageData(0, 0, width, height).data;
								
								// clear.
								imageContext = undefined;
								imageCanvas.remove();
								
								tempImg.onload = undefined;
							};
							
							tempImg.src = src;
							
							isImageDataLoading = true;
						}
						
						return origin(x, y) === true;
					}
					
					let tx = x - self.getDrawingX();
					let ty = y - self.getDrawingY();
					
					let cos = Math.cos(-self.getRealRadian());
					let sin = Math.sin(-self.getRealRadian());
					
					let px = cos * tx - sin * ty;
					let py = cos * ty + sin * tx;
					
					px = parseInt((px + width * self.getRealScaleX() / 2) / self.getRealScaleX());
					py = parseInt((py + height * self.getRealScaleY() / 2) / self.getRealScaleY());
					
					return (px >= 0 && px < width && py >= 0 && py < height && imageData[(py * width + px) * 4 + 3] > TRANSPARENT_ALPHA) || origin(x, y) === true;
				};
			});
			
			let checkOffScreen;
			OVERRIDE(self.checkOffScreen, (origin) => {
				
				checkOffScreen = self.checkOffScreen = () => {
					
					if (width === undefined || checkRectRect(
						
						SkyEngine.Screen.getCameraFollowX(),
						SkyEngine.Screen.getCameraFollowY(),
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
						
						return false;
					}
					
					return origin();
				};
			});
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				draw = self.draw = (context) => {
					
					let w = width - cropLeft - cropRight;
					let h = height - cropTop - cropBottom;
					
					if (w > 0 && h > 0) {
						context.drawImage(
							img,
							cropLeft,
							cropTop,
							w,
							h,
							-width / 2 + cropLeft,
							-height / 2 + cropTop,
							w,
							h);
					}
					
					origin(context);
				};
			});
			
			let drawArea;
			OVERRIDE(self.drawArea, (origin) => {
				
				drawArea = self.drawArea = (context) => {
					
					if (polygonPoints === undefined) {
						
						if (imageData === undefined) {
							
							if (isImageDataLoading !== true) {
								
								let tempImg = new Image();
								
								tempImg.onload = () => {
									
									let width = tempImg.width;
									let height = tempImg.height;
									
									let imageCanvas = CANVAS({
										style : {
											display : 'none'
										},
										width : width,
										height : height
									}).appendTo(BODY);
									
									let imageContext = imageCanvas.getContext('2d');
									imageContext.drawImage(tempImg, 0, 0, width, height);
									
									imageData = imageContext.getImageData(0, 0, width, height).data;
									
									polygonPoints = SkyEngine.Util.ImageData.convertImageDataToPolygonPoints(imageData, width);
									
									// clear.
									imageContext = undefined;
									imageCanvas.remove();
									
									tempImg.onload = undefined;
								};
								
								tempImg.src = src;
								
								isImageDataLoading = true;
							}
						}
						
						else {
							polygonPoints = SkyEngine.Util.ImageData.convertImageDataToPolygonPoints(imageData, width);
						}
					}
					
					else if (polygonPoints.length > 0) {
						
						context.moveTo(polygonPoints[0].x - width / 2, polygonPoints[0].y - height / 2);
						
						for (let i = 1; i < polygonPoints.length; i += 1) {
							let point = polygonPoints[i];
							context.lineTo(point.x - width / 2, point.y - height / 2);
						}
						
						context.lineTo(polygonPoints[0].x - width / 2, polygonPoints[0].y - height / 2);
					}
					
					origin(context);
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					img.onload = undefined;
					img = undefined;
					
					imageData = undefined;
					
					polygonPoints = undefined;
					
					origin();
				};
			});
			
			let getImg = inner.getImg = () => {
				return img;
			};
			
			let crop = self.crop = (params) => {
				//REQUIRED: params
				//REQUIRED: params.top
				//REQUIRED: params.right
				//REQUIRED: params.bottom
				//REQUIRED: params.left
				
				if (params.top !== undefined) {
					cropTop = params.top;
				}
				if (params.right !== undefined) {
					cropRight = params.right;
				}
				if (params.bottom !== undefined) {
					cropBottom = params.bottom;
				}
				if (params.left !== undefined) {
					cropLeft = params.left;
				}
			};
			
			let getWidth = self.getWidth = () => {
				return width;
			};
			
			let getHeight = self.getHeight = () => {
				return height;
			};
		}
	};
});
