SkyEngineSample.MAIN = METHOD({

	run : function(params) {
		'use strict';

		var
		// canvas
		canvas = CANVAS({
			width : 300,
			height : 300
		}).appendTo(BODY),
		
		// scene
		scene = SkyEngine.Scene(canvas.getContext('webgl'));
		
		var node1 = SkyEngine.Node().appendTo(scene);
		
		var node2 = SkyEngine.Node().appendTo(node1);
	}
});
