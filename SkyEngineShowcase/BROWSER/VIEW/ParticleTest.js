SkyEngineShowcase.ParticleTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let particle = SkyEngine.Particle({
			src : SkyEngineShowcase.R('star.png'),
			minCount : 50,
			maxCount : 100,
			minLifetime : 200,
			maxLifetime : 500,
			minSpeed : 3,
			maxSpeed : 7,
			minScale : 0.05,
			maxScale : 0.2,
			minAngle : 0,
			maxAngle : 360
		}).appendTo(SkyEngine.Screen);
		
		/*let rain = SkyEngine.Particle({
			src : SkyEngineShowcase.R('rain.png'),
			minX : -SkyEngine.Screen.getWidth() / 2,
			maxX : SkyEngine.Screen.getWidth() / 2,
			minCount : 50,
			maxCount : 100,
			minLifetime : 1000,
			maxLifetime : 1000,
			minSpeed : 3,
			maxSpeed : 7,
			minScale : 0.5,
			maxScale : 1,
			minAngle : 30,
			maxAngle : 30
		}).appendTo(SkyEngine.Screen);
		
		let moveRainEvent = EVENT('resize', RAR(() => {
			rain.setY(-SkyEngine.Screen.getHeight() / 2);
		}));*/
		
		let touchEvent = EVENT('touchstart', (e) => {
			particle.burst();
			e.stop();
		});
		
		/*let rainInterval = INTERVAL(0.1, () => {
			rain.burst();
		});*/
		
		inner.on('close', () => {
			
			particle.remove();
			//rain.remove();
			
			touchEvent.remove();
			
			//rainInterval.remove();
		});
	}
});
