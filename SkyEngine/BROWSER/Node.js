/**
 * 트리 구조를 정의하기 위한 Node 클래스 
 */
SkyEngine.Node = CLASS({

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		
		var
		// parent node
		parentNode,

		// child nodes
		childNodes = [],
		
		// x
		x,
		
		// y
		y,
		
		// z
		z,
		
		// get children.
		getChildren,

		// set parent.
		setParent,

		// get parent.
		getParent,

		// empty.
		empty,
		
		// append.
		append,
		
		// append to.
		appendTo,
		
		// append to parent.
		appendToParent,
		
		// remove from parent.
		removeFromParent,

		// remove.
		remove,

		// on.
		on,

		// off.
		off,
		
		// on meet.
		onMeet,
		
		// off meet.
		offMeet,
		
		// on part.
		onPart,
		
		// off part.
		offPart,
		
		// set x.
		setX,
		
		// get x.
		getX,
		
		// set y.
		setY,
		
		// get y.
		getY,
		
		// set z.
		setZ,
		
		// get z.
		getZ,
		
		// move.
		move,
		
		// stop.
		stop,
		
		// draw.
		draw;
		
		if (params !== undefined) {
			
			x = params.x;
			if (x === undefined) {
				x = 0;
			}
			
			y = params.y;
			if (y === undefined) {
				y = 0;
			}
			
			z = params.z;
			if (z === undefined) {
				z = 0;
			}
		}
		
		self.getChildren = getChildren = function() {
			return childNodes;
		};
		
		appendToParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = 0,
			
			// node
			node;

			while (minIndex <= maxIndex) {
				
				index = Math.floor((minIndex + maxIndex) / 2);
				node = parentChildren[index];

				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				} else {
					break;
				}
			}
			
			parentChildren.splice(index, 0, self);
		};
		
		removeFromParent = function() {
			
			var
			// parent children
			parentChildren = parentNode.getChildren(),
			
			// min index
			minIndex = 0,
			
			// max index
			maxIndex = parentChildren.length - 1,
			
			// index
			index = 0,
			
			// node
			node,
			
			// level
			level = 0;

			while (minIndex <= maxIndex) {
				
				index = Math.floor((minIndex + maxIndex) / 2);
				node = parentChildren[index];

				if (node.getZ() < z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
				}
				
				else if (node.getZ() === z) {
					
					while (true) {
						
						if (parentChildren[index - level] === self) {
							parentChildren.splice(index - level, 1);
							break;
						}
						
						if (level > 0 && parentChildren[index + level] === self) {
							parentChildren.splice(index + level, 1);
							break;
						}
						
						if (
						parentChildren[index - level].getZ() !== z &&
						parentChildren[index + level].getZ() !== z) {
							break;
						}
						
						level += 1;
					}
					
					break;
				}
			}
		};

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node
			
			if (parentNode !== undefined) {
				removeFromParent();
			}

			parentNode = node;
			
			appendToParent();

			return self;
		};
		
		self.append = append = function(node) {
			//REQUIRED: node
			
			node.appendTo(self);
		};
		
		self.on = on = function() {
			
		};
		
		self.setZ = setZ = function(_z) {
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		
		self.draw = draw = function(gl) {
			
			gl.clearColor(255.0, 255.0, 255.0, 1.0);
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LEQUAL);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		};
	}
});
