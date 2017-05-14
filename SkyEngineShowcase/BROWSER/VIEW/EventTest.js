SkyEngineShowcase.EventTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			x : -50,
			y : -50,
			width : 60,
			height : 40,
			color : 'green',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Rect!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		rect.addTouchArea(SkyEngine.Rect({
			width : 60,
			height : 40,
			c : SkyEngine.Rect({
				width : 40,
				height : 60
			})
		}));
		
		let circle = SkyEngine.Circle({
			x : 50,
			y : -50,
			width : 60,
			height : 40,
			color : 'yellow',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Circle!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		circle.addTouchArea(SkyEngine.Circle({
			width : 60,
			height : 40,
			c : SkyEngine.Circle({
				width : 40,
				height : 60
			})
		}));
		
		let polygon = SkyEngine.Polygon({
			x : -50,
			y : 50,
			points : [{
				x : -30,
				y : 50
			}, {
				x : 50,
				y : 40
			}, {
				x : 20,
				y : -50
			}],
			color : 'yellow',
			scale : 0.7,
			angle : -45,
			on : {
				touchstart : () => {
					console.log('This is Polygon!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		polygon.addTouchArea(SkyEngine.Polygon({
			points : [{
				x : -30,
				y : 50
			}, {
				x : 50,
				y : 40
			}, {
				x : 20,
				y : -50
			}],
			c : SkyEngine.Polygon({
				points : [{
					x : 30,
					y : -50
				}, {
					x : -50,
					y : -40
				}, {
					x : -20,
					y : 50
				}]
			})
		}));
		
		let character = SkyEngine.Image({
			src : SkyEngineShowcase.R('robot/run1.png'),
			x : 50,
			y : 50,
			fps : 10,
			scale : 0.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Image!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		character.addTouchArea(SkyEngine.Image({
			src : SkyEngineShowcase.R('robot/run1.png')
		}));
		
		inner.on('close', () => {
			
			rect.remove();
			rect = undefined;
			
			circle.remove();
			circle = undefined;
			
			polygon.remove();
			polygon = undefined;
			
			character.remove();
			character = undefined;
		});
	}
});
