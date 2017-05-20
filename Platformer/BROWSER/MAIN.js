Platformer.MAIN = METHOD({

	run : (params) => {
		
		Platformer.MATCH_VIEW({
			uri : 'level/grass',
			target : Platformer.Grass
		});
	}
});
