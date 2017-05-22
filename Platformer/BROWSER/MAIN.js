Platformer.MAIN = METHOD({

	run : (params) => {
		
		SkyEngine.Screen.setScale(0.5);
		
		Platformer.MATCH_VIEW({
			uri : 'level/grass',
			target : Platformer.Grass
		});
	}
});
