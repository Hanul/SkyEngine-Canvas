SkyEngineShowcase.ParticleTest2 = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let touchEvent = EVENT('touchstart', (e) => {
			
			SkyEngine.ParticleSystem({
				x : e.getLeft() - SkyEngine.Screen.getWidth() / 2,
				y : e.getTop() - SkyEngine.Screen.getHeight() / 2,
				particleFigure : 'circle',
				particleWidth : 5,
				particleHeight : 5,
				particleAccelY : 200,
				minParticleColorR : 0,
				minParticleColorR : 255,
				minParticleColorG : 0,
				minParticleColorG : 255,
				minParticleColorB : 0,
				minParticleColorB : 255,
				minParticleCount : 200,
				maxParticleCount : 300,
				minParticleLifetime : 1000,
				maxParticleLifetime : 2000,
				minParticleDirection : 0,
				maxParticleDirection : 360,
				minParticleSpeed : 50,
				maxParticleSpeed : 100,
				minParticleScale : 0.5,
				maxParticleScale : 1,
				particleFadingSpeed : -1,
				blendMode : 'lighter'
			}).appendTo(SkyEngine.Screen).burst((particle) => {
				particle.remove();
			});
			
			e.stop();
		});
		
		inner.on('close', () => {
			touchEvent.remove();
		});
	}
});
