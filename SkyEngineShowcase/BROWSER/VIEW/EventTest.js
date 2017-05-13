SkyEngineShowcase.EventTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			x : -100,
			width : 60,
			height : 40,
			color : 'green',
			angle : 45,
			scale : 1.2,
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
			width : 60,
			height : 40,
			color : 'yellow',
			angle : 45,
			scale : 1.2,
			on : {
				touchstart : () => {
					console.log('This is Circle!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		circle.addTouchArea(SkyEngine.Circle({
			width : 60,
			height : 40
		}));
		
		let character = SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png'),
				SkyEngineShowcase.R('robot/run5.png'),
				SkyEngineShowcase.R('robot/run6.png'),
				SkyEngineShowcase.R('robot/run7.png'),
				SkyEngineShowcase.R('robot/run8.png')
			],
			fps : 10,
			scale : 0.2
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			
			rect.remove();
			rect = undefined;
			
			circle.remove();
			circle = undefined;
			
			character.remove();
			character = undefined;
		});
	}
});
