/*
 * 파티클 시스템 노드
 */
SkyEngine.ParticleSystem = CLASS(() => {
	
	let random = (min, max) => {
		return Math.random() * (max - min) + min;
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			//OPTIONAL: params.particleX
			//OPTIONAL: params.minParticleX
			//OPTIONAL: params.maxParticleX
			//OPTIONAL: params.particleY
			//OPTIONAL: params.minParticleY
			//OPTIONAL: params.maxParticleY
			//OPTIONAL: params.particleCount
			//REQUIRED: params.minParticleCount
			//REQUIRED: params.maxParticleCount
			//OPTIONAL: params.particleLifetime
			//REQUIRED: params.minParticleLifetime
			//REQUIRED: params.maxParticleLifetime
			//OPTIONAL: params.particleSpeed
			//REQUIRED: params.minParticleSpeed
			//REQUIRED: params.maxParticleSpeed
			//OPTIONAL: params.particleScale
			//REQUIRED: params.minParticleScale
			//REQUIRED: params.maxParticleScale
			//OPTIONAL: params.particleAngle
			//REQUIRED: params.minParticleAngle
			//REQUIRED: params.maxParticleAngle
			
			let src = params.src;
			
			let minX = params.minX;
			let maxX = params.maxX;
			
			let minY = params.minY;
			let maxY = params.maxY;
			
			let minCount = params.minCount;
			let maxCount = params.maxCount;
			
			let minLifetime = params.minLifetime;
			let maxLifetime = params.maxLifetime;
			
			let minSpeed = params.minSpeed;
			let maxSpeed = params.maxSpeed;
			
			let minScale = params.minScale;
			let maxScale = params.maxScale;
			
			let minAngle = params.minAngle;
			let maxAngle = params.maxAngle;
			
			if (minX === undefined) {
				minX = 0;
			}
			
			if (maxX === undefined) {
				maxX = 0;
			}
			
			if (minY === undefined) {
				minY = 0;
			}
			
			if (maxY === undefined) {
				maxY = 0;
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
			
			let particleInfos = [];
			
			let burst = self.burst = () => {
				
				REPEAT(random(minCount, maxCount), () => {
					
					let radian = random(minAngle, maxAngle) * Math.PI / 180;
					
					let speed = random(minSpeed, maxSpeed);
					
					let sin = Math.sin(radian);
					let cos = Math.cos(radian);
					
					particleInfos.push({
						x : random(minX, maxX),
						y : random(minY, maxY),
						time : 0,
						lifetime : random(minLifetime, maxLifetime),
						scale : random(minScale, maxScale),
						dx : speed * cos - speed * sin,
						dy : speed * sin + speed * cos
					});
				});
			};
			
			let step;
			OVERRIDE(self.step, (origin) => {
				
				step = self.step = (deltaTime) => {
					
					particleInfos.forEach((particleInfo, i) => {
						
						let scale = particleInfo.scale;
						
						particleInfo.x += particleInfo.dx / scale;
						particleInfo.y += particleInfo.dy / scale;
						particleInfo.time += deltaTime;
						
						if (particleInfo.time > particleInfo.lifetime) {
							particleInfos.splice(i, 1);
						}
					});
					
					origin(deltaTime);
				};
			});
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				draw = self.draw = (context) => {
					
					particleInfos.forEach((particleInfo) => {
						
						let scale = particleInfo.scale;
						
						context.save();
						
						context.scale(scale, scale);
						
						context.drawImage(
							img,
							particleInfo.x - width / 2,
							particleInfo.y - height / 2,
							width,
							height);
						
						context.restore();
					});
					
					origin(context);
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					img.onload = undefined;
					img = undefined;
					
					particleInfos = undefined;
					
					origin();
				};
			});
		}
	};
});
