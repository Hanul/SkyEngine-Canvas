SkyEngineShowcase.MAIN = METHOD({

	run : (params) => {
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : '',
			target : SkyEngineShowcase.MainMenu
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'hello',
			target : SkyEngineShowcase.HelloSkyEngine
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/draw',
			target : SkyEngineShowcase.DrawTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/node',
			target : SkyEngineShowcase.NodeTest
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
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/filter',
			target : SkyEngineShowcase.FilterTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/blendmode',
			target : SkyEngineShowcase.BlendModeTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/event',
			target : SkyEngineShowcase.EventTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/collision',
			target : SkyEngineShowcase.CollisionTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/intersection',
			target : SkyEngineShowcase.IntersectionTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/performance',
			target : SkyEngineShowcase.PerformanceTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/raycast',
			target : SkyEngineShowcase.RaycastTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/tilemap',
			target : SkyEngineShowcase.TileMapTest
		});
	}
});
