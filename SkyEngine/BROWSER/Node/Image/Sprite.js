/*
 * 스프라이트 애니메이션 노드
 */
SkyEngine.Sprite = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.src
		//OPTIONAL: params.srcs
		//OPTIONAL: params.spriteWidth
		//OPTIONAL: params.spriteHeight
		//OPTIONAL: params.frameCount
		//OPTIONAL: params.fps
		
		let src = params.src;
		let srcs = params.srcs;
		let spriteWidth = params.spriteWidth;
		let spriteHeight = params.spriteHeight;
		let frameCount = params.frameCount;
		let fps = params.fps;
		
		let img;
		let imgs;
		
		let width;
		let height;
		
		let frame = 0;
		
		if (fps === undefined) {
			fps = 0;
		}
		
		if (src !== undefined) {
			img = new Image();
			
			img.onload = () => {
				
				width = img.width;
				height = img.height;
				
				if (spriteWidth === undefined) {
					spriteWidth = width;
				}
				
				if (spriteHeight === undefined) {
					spriteHeight = height;
				}
				
				if (frameCount === undefined) {
					frameCount = width / spriteWidth * height / spriteHeight;
				}
				
				img.onload = undefined;
				
				self.fireEvent('load');
			};
			
			img.src = src;
		}
		
		if (srcs !== undefined) {
			EACH(srcs, (src) => {
				
				let img = new Image();
				
				if (imgs === undefined) {
					imgs = [];
				}
					
				img.onload = () => {
					
					width = img.width;
					height = img.height;
					
					if (spriteWidth === undefined) {
						spriteWidth = width;
					}
					
					if (spriteHeight === undefined) {
						spriteHeight = height;
					}
					
					if (frameCount === undefined) {
						frameCount = 1;
					} else {
						frameCount += 1;
					}
					
					img.onload = undefined;
					
					self.fireEvent('load');
				};
				
				img.src = src;
				
				imgs.push(img);
			});
		}
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				if (fps > 0) {
					frame += fps * deltaTime / 1000;
				}
				
				if (frameCount !== undefined) {
					if (frame >= frameCount) {
						frame -= frameCount;
					}
				}
				
				origin(deltaTime);
			};
		});
		
		let show;
		OVERRIDE(self.show, (origin) => {
			
			show = self.show = () => {
				
				frame = 0;
				
				origin();
			};
		});
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context) => {
				
				if (imgs !== undefined) {
					if (frameCount !== undefined) {
						
						let frameImg = imgs[Math.floor(frame)];
						
						if (frameImg !== undefined) {
							
							context.drawImage(
								frameImg,
								-width / 2,
								-height / 2,
								width,
								height);
						}
					}
				}
				
				else if (
				width !== undefined && height !== undefined &&
				spriteWidth !== undefined && spriteHeight !== undefined) {
					
					context.drawImage(
						img,
						spriteWidth * Math.floor(frame % (width / spriteWidth)), spriteHeight * Math.floor(frame / (width / spriteWidth)),
						spriteWidth, spriteHeight,
						-spriteWidth / 2, -spriteHeight / 2,
						spriteWidth,
						spriteHeight);
				}
				
				origin(context);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				srcs = undefined;
				
				img = undefined;
				imgs = undefined;
				
				origin();
			};
		});
	}
});
