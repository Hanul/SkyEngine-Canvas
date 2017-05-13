SkyEngineShowcase.NodeTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let leftArm;
		let man = SkyEngine.Rect({
			width : 40,
			height : 80,
			color : 'green',
			c : [
			// head
			SkyEngine.Node({
				y : -40,
				c : SkyEngine.Circle({
					y : -25,
					width : 50,
					height : 50,
					color : 'yellow'
				})
			}),
			
			// left arm
			leftArm = SkyEngine.Node({
				x : -20,
				y : -40,
				angle : 40,
				c : SkyEngine.Rect({
					y : 30,
					width : 20,
					height : 60,
					color : 'purple',
					c : SkyEngine.Node({
						y : 30,
						angle : -40,
						c : SkyEngine.Rect({
							y : 30,
							width : 20,
							height : 60,
							color : 'purple'
						})
					})
				})
			}),
			
			// right arm
			SkyEngine.Node({
				x : 20,
				y : -40,
				angle : -40,
				c : SkyEngine.Rect({
					y : 30,
					width : 20,
					height : 60,
					color : 'purple',
					c : SkyEngine.Node({
						y : 30,
						angle : 40,
						c : SkyEngine.Rect({
							y : 30,
							width : 20,
							height : 60,
							color : 'purple'
						})
					})
				})
			})]
		}).appendTo(SkyEngine.Screen);
		
		leftArm.setScalingSpeedX(1);
		
		let delay = DELAY(1, () => {
			leftArm.setScalingSpeedX(-1);
			delay = DELAY(1, () => {
				leftArm.setScalingSpeedX(0);
			});
		});
		
		inner.on('close', () => {
			
			man.remove();
			man = undefined;
			
			delay.remove();
			delay = undefined;
		});
	}
});
