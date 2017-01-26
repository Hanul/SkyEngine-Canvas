SkyEngineShowcase.NodeTest = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// left arm
		leftArm,
		
		// man
		man = SkyEngine.Rect({
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
		
		delay = DELAY(1, function() {
			leftArm.setScalingSpeedX(-1);
			delay = DELAY(1, function() {
				leftArm.setScalingSpeedX(0);
			});
		});
		
		inner.on('close', function() {
			
			man.remove();
			man = undefined;
			
			delay.remove();
			delay = undefined;
		});
	}
});
