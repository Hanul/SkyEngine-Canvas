SkyEngineShowcase.DrawTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let line = SkyEngine.Line({
			y : -140,
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10,
			border : '5px solid red'
		}).appendTo(SkyEngine.Screen);
		
		let rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : 'green'
		}).appendTo(SkyEngine.Screen);
		
		let circle = SkyEngine.Circle({
			width : 300,
			height : 200,
			color : 'yellow'
		}).appendTo(SkyEngine.Screen);
		
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
			
			line.remove();
			line = undefined;
			
			rect.remove();
			rect = undefined;
			
			circle.remove();
			circle = undefined;
			
			character.remove();
			character = undefined;
		});
	}
});
