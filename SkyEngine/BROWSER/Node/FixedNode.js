/*
 * 위치 고정 노드
 */
SkyEngine.FixedNode = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.followScreenRatio
		
		let followScreenRatio;
		
		if (params !== undefined) {
			followScreenRatio = params.followScreenRatio;
		}
		
		if (followScreenRatio === undefined) {
			followScreenRatio = 0;
		}
		
		let originX;
		let originY;
		
		let fixPosition = self.fixPosition = () => {
			
			if (followScreenRatio !== 1) {
				
				if (originX === undefined) {
					originX = self.getX();
					originY = self.getY();
				}
				
				self.setX(originX + SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX());
				self.setY(originY + SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY());
			}
		};
	}
});
