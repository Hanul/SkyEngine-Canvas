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
		
		let canvasWidth;
		let canvasHeight;
		
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
		
		let stepAll = (node, drawingX, drawingY, realScaleX, realScaleY, realRadian, deltaTime) => {
			
			node.step(deltaTime);
			
			let plusX = node.getX() * realScaleX;
			let plusY = node.getY() * realScaleY;
			
			let plusCenterX = node.getCenterX() * realScaleX;
			let plusCenterY = node.getCenterY() * realScaleY;
			
			let sin = Math.sin(realRadian);
			let cos = Math.cos(realRadian);
			
			drawingX += plusX * cos - plusY * sin;
			drawingY += plusX * sin + plusY * cos;
			
			let realX = drawingX;
			let realY = drawingY;
			
			realScaleX *= node.getScaleX();
			realScaleY *= node.getScaleY();
			
			realRadian += node.getAngle() * Math.PI / 180;
			
			sin = Math.sin(realRadian);
			cos = Math.cos(realRadian);
			
			drawingX -= plusCenterX * cos - plusCenterY * sin;
			drawingY -= plusCenterX * sin + plusCenterY * cos;
			
			node.setRealProperties(drawingX, drawingY, realX, realY, realScaleX, realScaleY, realRadian);
			
			node.getChildren().forEach((childNode) => {
				stepAll(childNode, realX, realY, realScaleX, realScaleY, realRadian, deltaTime);
			});
			
			node.getTouchAreas().forEach((touchArea) => {
				stepAll(touchArea, drawingX, drawingY, realScaleX, realScaleY, realRadian, deltaTime);
			});
			
			node.getColliders().forEach((collider) => {
				stepAll(collider, drawingX, drawingY, realScaleX, realScaleY, realRadian, deltaTime);
			});
			
			node.checkAllCollisions(drawingX, drawingY, realScaleX, realScaleY, realRadian);
		};
		
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
		
		let drawAll = (node, context, realAlpha) => {
			
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
			
			node.getChildren().forEach((childNode) => {
				drawAll(childNode, context, realAlpha);
			});
			
			context.restore();
			
			// 개발 모드에서는 중점 및 영역 표시
			if (CONFIG.SkyEngine.isDebugMode === true) {
				
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
				
				node.getTouchAreas().forEach((touchArea) => {
					drawAllArea(touchArea, context, 'magenta');
				});
				
				node.getColliders().forEach((collider) => {
					drawAllArea(collider, context, 'lime');
				});
			}
		};
		
		let loop = LOOP((_deltaTime) => {
			
			deltaTime = _deltaTime;
			
			stepAll(self, canvasWidth / 2, canvasHeight / 2, 1, 1, self.getAngle() * Math.PI / 180, deltaTime);
			
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			
			drawAll(self, context, self.getAlpha());
		});
		
		EVENT('resize', RAR(() => {
			
			canvasWidth = WIN_WIDTH();
			canvasHeight = WIN_HEIGHT();
			
			canvas.setSize({
				width : canvasWidth,
				height : canvasHeight
			});
		}));
		
		self.on('remove', () => {
			loop.remove();
		});
	}
});
