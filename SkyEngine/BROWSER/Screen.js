/*
 * 게임 화면 전체를 다루는 오브젝트
 */
SkyEngine.Screen = OBJECT({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self) => {
		
		let wrapper = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0
			}
		}).appendTo(BODY);
		
		let canvas = CANVAS().appendTo(wrapper);
		let context = canvas.getContext('2d');
		
		let width;
		let height;
		
		let deltaTime;
		
		let registeredNodeMap = {};
		let registeredEventNodeMap = {};
		
		// 드로잉 노드 등록
		let registerNode = self.registerNode = (node) => {
			
			let cls = node.type;
			
			while (cls !== undefined && cls !== CLASS) {
				
				if (registeredNodeMap[cls.id] === undefined) {
					registeredNodeMap[cls.id] = [];
				}
				
				registeredNodeMap[cls.id].push(node);
				
				cls = cls.mom;
			}
		};
		
		// 드로잉 노드 해제
		let unregisterNode = self.unregisterNode = (node) => {
			
			let cls = node.type;
			
			while (cls !== undefined && cls !== CLASS) {
				
				if (registeredNodeMap[cls.id] !== undefined) {
					
					REMOVE({
						array : registeredNodeMap[cls.id],
						value : node
					});
					
					if (registeredNodeMap[cls.id].length === 0) {
						delete registeredNodeMap[cls.id];
					}
				}
				
				cls = cls.mom;
			}
		};
		
		let getRegisteredNodes = self.getRegisteredNodes = (cls) => {
			return registeredNodeMap[cls.id] === undefined ? [] : registeredNodeMap[cls.id];
		};
		
		// 이벤트 노드 등록
		let registerEventNode = self.registerEventNode = (eventName, node) => {
			
			if (registeredEventNodeMap[eventName] !== undefined) {
				registeredEventNodeMap[eventName].push(node);
			}
		};
		
		// 이벤트 노드 해제
		let unregisterEventNode = self.unregisterEventNode = (eventName, node) => {
			
			if (registeredEventNodeMap[eventName] !== undefined) {
				
				REMOVE({
					array : registeredEventNodeMap[eventName],
					value : node
				});
			}
		};
		
		// 디버그 모드에서는 FPS 수치 표시
		if (CONFIG.SkyEngine.isDebugMode === true) {
			
			let fpsDom = DIV({
				style : {
					position : 'fixed',
					left : 5,
					top : 5,
					fontSize : 12
				}
			}).appendTo(BODY);
			
			INTERVAL(0.1, () => {
				
				if (deltaTime !== undefined) {
					fpsDom.empty();
					fpsDom.append('FPS: ' + parseInt(1 / deltaTime * 1000));
				}
			});
		}
		
		EACH([
			'tap',
			'touchstart',
			'touchend'
		], (eventName) => {
			
			registeredEventNodeMap[eventName] = [];
			
			canvas.on(eventName, (e) => {
				
				EACH(registeredEventNodeMap[eventName], (node) => {
					
					if (node.checkTouch(e.getLeft(), e.getTop()) === true) {
						node.fireEvent(eventName);
					}
				});
				
				e.stop();
			});
		});
		
		// 노드의 모든 영역을 그립니다.
		let drawAllArea = (node, context, color) => {
			
			context.save();
			
			context.translate(node.getDrawingX(), node.getDrawingY());
			context.rotate(node.getRealRadian());
			context.scale(node.getRealScaleX(), node.getRealScaleY());
			
			context.beginPath();
			
			node.drawArea(context);
			
			context.strokeStyle = color;
			context.stroke();
			context.closePath();
			
			context.restore();
			
			node.getChildren().forEach((childNode) => {
				drawAllArea(childNode, context, color);
			});
		};
		
		// 모든 노드를 그립니다.
		let drawAll = (node, context, realAlpha) => {
			
			if (node.checkIsHiding() !== true) {
				
				realAlpha *= node.getAlpha();
				
				context.save();
				
				if (node.getFilter() !== undefined) {
					context.filter = node.getFilter();
				}
				
				if (node.getBlendMode() !== undefined) {
					context.globalCompositeOperation = node.getBlendMode();
				}
				
				context.save();
				
				context.translate(node.getDrawingX(), node.getDrawingY());
				context.rotate(node.getRealRadian());
				context.scale(node.getRealScaleX(), node.getRealScaleY());
				
				context.globalAlpha = realAlpha;
				
				node.draw(context);
				
				context.restore();
				
				// 모든 자식 노드를 그립니다.
				node.getChildren().forEach((childNode) => {
					drawAll(childNode, context, realAlpha);
				});
				
				context.restore();
				
				// 개발 모드에서는 중점 및 영역 표시
				if (CONFIG.SkyEngine.isDebugMode === true) {
					
					// 중점을 그립니다.
					context.beginPath();
					context.strokeStyle = context.fillStyle = 'aqua';
					
					let realX = node.getRealX();
					let realY = node.getRealY();
					
					context.rect(realX - 1, realY - 1, 2, 2);
					
					context.moveTo(realX - 15, realY);
					context.lineTo(realX + 15, realY);
					context.moveTo(realX, realY - 15);
					context.lineTo(realX, realY + 15);
					context.stroke();
					
					// 터치 영역을 그립니다.
					node.getTouchAreas().forEach((touchArea) => {
						drawAllArea(touchArea, context, 'magenta');
					});
					
					// 충돌 영역을 그립니다.
					node.getColliders().forEach((collider) => {
						drawAllArea(collider, context, 'lime');
					});
				}
			}
		};
		
		let loop = LOOP((_deltaTime) => {
			
			deltaTime = _deltaTime;
			
			// 모든 노드의 step을 실행합니다.
			self.step(deltaTime);
			
			// 모든 노드를 그립니다.
			context.clearRect(0, 0, width, height);
			
			context.save();
			context.translate(width / 2, height / 2);
			
			drawAll(self, context, self.getAlpha());
			
			context.restore();
		});
		
		// 화면 크기가 변경되는 경우, 캔버스의 크기 또한 변경되어야 합니다.
		EVENT('resize', RAR(() => {
			
			width = WIN_WIDTH();
			height = WIN_HEIGHT();
			
			canvas.setSize({
				width : width,
				height : height
			});
		}));
		
		self.on('remove', () => {
			loop.remove();
		});
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
	}
});
