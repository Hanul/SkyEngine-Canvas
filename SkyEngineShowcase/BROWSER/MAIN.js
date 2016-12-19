SkyEngineShowcase.MAIN = METHOD({

	run : function(params) {
		'use strict';
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : '',
			target : SkyEngineShowcase.MainMenu
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/moving',
			target : SkyEngineShowcase.MovingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/scaling',
			target : SkyEngineShowcase.ScalingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/rotation',
			target : SkyEngineShowcase.RotationTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/fading',
			target : SkyEngineShowcase.FadingTest
		});
		
		/*var node1 = SkyEngine.Node({
			//accelY : 9.8 * 10,
			alpha : 0.5,
			scale : 0.5,
			//angle : 90
		}).appendTo(SkyEngine.Screen); // 0
		
		var node2 = SkyEngine.Image({
			src : 'R/sample.png',
			x : -100,
			y : -100
		}).appendTo(node1); // 0*/
		
		/*REPEAT(1000, function() {
			
			SkyEngine.Sprite({
				src : 'R/sprite.png',
				spriteWidth : 128,
				spriteHeight : 128,
				fps : 10
			}).appendTo(node1); // 1
		});*/
		
		/*SkyEngine.Sprite({
			src : 'R/sprite.png',
			spriteWidth : 128,
			spriteHeight : 128,
			fps : 10,
			z : 4
		}).appendTo(node2);
		
		SkyEngine.Sprite({
			srcs : ['R/Sprite2/frame1.png', 'R/Sprite2/frame2.png', 'R/Sprite2/frame3.png', 'R/Sprite2/frame4.png'],
			fps : 1,
			scale : 0.2,
			alpha : 0.2
		}).appendTo(node1); // 2
		
		SkyEngine.Dom({
			style : {
				color : '#000'
			},
			c : 'Test'
		}).appendTo(node1);*/
		
		/*node1.moveUp(50);
		node1.moveLeft(50);
		
		DELAY(3, function() {
			node1.stopUp();
			node1.stopLeft();
		});*/
	}
});
