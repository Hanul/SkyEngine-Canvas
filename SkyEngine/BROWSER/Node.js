/**
 * 트리 구조를 정의하기 위한 Node 클래스 
 * 
 * + 이동 처리
 * + 회전 처리
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
		
		// fire event.
		fireEvent,
		
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
		
		// add collider.
		addCollider,
		
		// add touch area.
		addTouchArea,
		
		// move.
		move,
		
		// stop.
		stop,
		
		// draw.
		draw;
		
		if (params !== undefined) {
			x = params.x;
			y = params.y;
			z = params.z;
		}
		
		if (x === undefined) {
			x = 0;
		}
		
		if (y === undefined) {
			y = 0;
		}
		
		if (z === undefined) {
			z = 0;
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
			maxIndex = parentChildren.length,
			
			// index
			index = 0,
			
			// node
			node;

			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				if (index === maxIndex) {
					break;
				}
				
				node = parentChildren[index];
				if (node.getZ() <= z) {
					minIndex = index + 1;
				} else if (node.getZ() > z) {
					maxIndex = index - 1;
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
			maxIndex = parentChildren.length,
			
			// index
			index = 0,
			
			// node
			node,
			
			// level
			level = 0;

			while (minIndex <= maxIndex) {
				
				index = Math.ceil((minIndex + maxIndex) / 2);
				if (index === maxIndex) {
					break;
				}
				
				node = parentChildren[index];
				if (node.getZ() <= z) {
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
		
		self.fireEvent = fireEvent = function() {
			
		};
		
		self.setX = setX = function(_x) {
			x = _x;
		};
		
		self.getX = getX = function() {
			return x;
		};
		
		self.setY = setY = function(_y) {
			y = _y;
		};
		
		self.getY = getY = function() {
			return y;
		};
		
		self.setZ = setZ = function(_z) {
			
			if (parentNode !== undefined) {
				removeFromParent();
				z = _z;
				appendToParent();
			}
		};
		
		self.getZ = getZ = function() {
			return z;
		};
		
		self.draw = draw = function(context, deltaTime, parentRealX, parentRealY) {
			
			childNodes.forEach(function(childNode) {
				childNode.draw(context, deltaTime, parentRealX + x, parentRealY + y);
			});
		};
	}
});
