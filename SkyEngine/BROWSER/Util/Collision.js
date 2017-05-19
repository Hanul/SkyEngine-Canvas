SkyEngine('Util').Collision = OBJECT({

	init : (inner, self) => {
		
		let checkBetween = (
			point,
			start, end
		) => {
			return (start - point) * (end - point) <= 0;
		};
		
		let checkPointInRect = self.checkPointInRect = (
			pointX, pointY,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectRadian
		) => {
			
			let tempX = pointX;
			let tempY = pointY;
			
			if (rectRadian !== 0) {
				
				let cos = Math.cos(rectRadian);
				let sin = Math.sin(rectRadian);
				
				pointX -= rectX;
				pointY -= rectY;
				
				tempX = rectX + cos * pointX + sin * pointY;
				tempY = rectY - sin * pointX + cos * pointY;
			}
			
			rectWidth *= rectScaleX;
			rectHeight *= rectScaleY;
			
			rectX -= rectWidth / 2;
			rectY -= rectHeight / 2;
			
			return checkBetween(tempX, rectX, rectX + rectWidth) === true && checkBetween(tempY, rectY, rectY + rectHeight) === true;
		};
		
		let checkPointInCircle = self.checkPointInCircle = (
			pointX, pointY,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleRadian
		) => {

			let cos = 1;
			let sin = 0;
			
			if (circleRadian !== 0) {
				cos = Math.cos(circleRadian);
				sin = Math.sin(circleRadian);
			}
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			pointX -= circleX;
			pointY -= circleY;

			let tempX = 2 * (cos * pointX + sin * pointY) / circleWidth;
			let tempY = 2 * (sin * pointX - cos * pointY) / circleHeight;
			
			return tempX * tempX + tempY * tempY <= 1;
		};
		
		let checkPointInPolygon = self.checkPointInPolygon = (
			pointX, pointY,
			
			polygonX, polygonY,
			points,
			polygonScaleX, polygonScaleY,
			polygonRadian
		) => {
			
			let tempX = pointX;
			let tempY = pointY;
			
			if (polygonRadian !== 0) {
				
				let cos = Math.cos(polygonRadian);
				let sin = Math.sin(polygonRadian);
				
				pointX -= polygonX;
				pointY -= polygonY;
				
				tempX = polygonX + cos * pointX + sin * pointY;
				tempY = polygonY - sin * pointX + cos * pointY;
			}
			
			tempX -= polygonX;
			tempY -= polygonY;
			
			let result = false;
			
			let length = points.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = points[i].x * polygonScaleX;
				let iY = points[i].y * polygonScaleY;
				
				let jX = points[j].x * polygonScaleX;
				let jY = points[j].y * polygonScaleY;
				
				if ((iY > tempY) !== (jY > tempY) && tempX < (jX - iX) * (tempY - iY) / (jY - iY) + iX) {
					result = !result;
				}
			}
			
			return result;
		};
		
		let checkLineLine = self.checkLineLine = (
			aX, aY,
			aStartX, aStartY,
			aEndX, aEndY,
			aScaleX, aScaleY,
			aRadian,
			
			bX, bY,
			bStartX, bStartY,
			bEndX, bEndY,
			bScaleX, bScaleY,
			bRadian
		) => {
			
			let aTempStartX = aX;
			let aTempStartY = aY;
			
			let aTempEndX = aX;
			let aTempEndY = aY;
			
			aStartX *= aScaleX;
			aStartY *= aScaleY;
				
			aEndX *= aScaleX;
			aEndY *= aScaleY;
			
			if (aRadian === 0) {
				
				aTempStartX += aStartX;
				aTempStartY += aStartY;
				
				aTempEndX += aEndX;
				aTempEndY += aEndY;
			}
			
			else {
					
				let cos = Math.cos(aRadian);
				let sin = Math.sin(aRadian);
				
				aTempStartX += cos * aStartX + sin * aStartY;
				aTempStartY += sin * aStartX + cos * aStartY;
				
				aTempEndX += cos * aEndX + sin * aEndY;
				aTempEndY += sin * aEndX + cos * aEndY;
			}
			
			let bTempStartX = bX;
			let bTempStartY = bY;
			
			let bTempEndX = bX;
			let bTempEndY = bY;
			
			bStartX *= bScaleX;
			bStartY *= bScaleY;
				
			bEndX *= bScaleX;
			bEndY *= bScaleY;
			
			if (bRadian === 0) {
				
				bTempStartX += bStartX;
				bTempStartY += bStartY;
				
				bTempEndX += bEndX;
				bTempEndY += bEndY;
			}
			
			else {
				
				let cos = Math.cos(bRadian);
				let sin = Math.sin(bRadian);
				
				bTempStartX += cos * bStartX + sin * bStartY;
				bTempStartY += sin * bStartX + cos * bStartY;
				
				bTempEndX += cos * bEndX + sin * bEndY;
				bTempEndY += sin * bEndX + cos * bEndY;
			}
			
			let denom = (aTempEndX - aTempStartX) * (bTempEndY - bTempStartY) - (bTempEndX - bTempStartX) * (aTempEndY - aTempStartY);
			
			if (denom === 0) {
				return false;
			}
			
			else {
				
				let ua = ((bTempEndY - bTempStartY) * (bTempEndX - aTempStartX) + (bTempStartX - bTempEndX) * (bTempEndY - aTempStartY)) / denom;
				let ub = ((aTempStartY - aTempEndY) * (bTempEndX - aTempStartX) + (aTempEndX - aTempStartX) * (bTempEndY - aTempStartY)) / denom;
				
				return 0 < ua && ua < 1 && 0 < ub && ub < 1;
			}
		};
		
		let checkLineRect = self.checkLineRect = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineRadian,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectRadian
		) => {
			
			let lineTempStartX = lineX;
			let lineTempStartY = lineY;
			
			let lineTempEndX = lineX;
			let lineTempEndY = lineY;
			
			if (lineRadian === 0) {
				
				lineTempStartX += lineStartX * lineScaleX;
				lineTempStartY += lineStartY * lineScaleY;
				
				lineTempEndX += lineEndX * lineScaleX;
				lineTempEndY += lineEndY * lineScaleY;
			}
			
			else {
				
				let cos = Math.cos(lineRadian);
				let sin = Math.sin(lineRadian);
				
				lineTempStartX += cos * lineStartX + sin * lineStartY;
				lineTempStartY += sin * lineStartX + cos * lineStartY;
				
				lineTempEndX += cos * lineEndX + sin * lineEndY;
				lineTempEndY += sin * lineEndX + cos * lineEndY;
			}
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			if (rectRadian === 0) {
				
				rectPoint1X = rectX - rectWidth;	rectPoint1Y = rectY - rectHeight;
				rectPoint2X = rectX + rectWidth;	rectPoint2Y = rectY - rectHeight;
				rectPoint3X = rectX + rectWidth;	rectPoint3Y = rectY + rectHeight;
				rectPoint4X = rectX - rectWidth;	rectPoint4Y = rectY + rectHeight;
			}
			
			else {
				
				let cos = Math.cos(-rectRadian);
				let sin = Math.sin(-rectRadian);
				
				let cw = cos * rectWidth;	let ch = cos * rectHeight;
				let sw = sin * rectWidth;	let sh = sin * rectHeight;
				
				rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
				rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
				rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
				rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			}
			
			return checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0) === true;
		};
		
		let checkLineCircle = self.checkLineCircle = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineRadian,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleRadian
		) => {
			
			let lineTempStartX = lineX;
			let lineTempStartY = lineY;
			
			let lineTempEndX = lineX;
			let lineTempEndY = lineY;
			
			if (lineRadian === 0) {
				
				lineTempStartX += lineStartX * lineScaleX;
				lineTempStartY += lineStartY * lineScaleY;
				
				lineTempEndX += lineEndX * lineScaleX;
				lineTempEndY += lineEndY * lineScaleY;
			}
			
			else {
				
				let cos = Math.cos(lineRadian);
				let sin = Math.sin(lineRadian);
				
				lineTempStartX += cos * lineStartX + sin * lineStartY;
				lineTempStartY += sin * lineStartX + cos * lineStartY;
				
				lineTempEndX += cos * lineEndX + sin * lineEndY;
				lineTempEndY += sin * lineEndX + cos * lineEndY;
			}
			
			let tempStartX = lineTempStartX;
			let tempStartY = lineTempStartY;
			
			let tempEndX = lineTempEndX;
			let tempEndY = lineTempEndY;
			
			if (circleRadian !== 0) {
				
				let cos = Math.cos(circleRadian);
				let sin = Math.sin(circleRadian);
				
				tempStartX = cos * lineTempStartX + sin * lineTempStartY;
				tempStartY = -sin * lineTempStartX + cos * lineTempStartY;
				
				tempEndX = cos * lineTempEndX + sin * lineTempEndY;
				tempEndY = -sin * lineTempEndX + cos * lineTempEndY;
			}
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let m = (tempEndY - tempStartY) / (tempEndX - tempStartX);
			
			if (Math.abs(m) > 1024) {
				return checkLineCircle(0, 0, tempStartY, tempStartX, tempEndY, tempEndX, 1, 1, 0, 0, 0, circleHeight, circleWidth, 1, 1, 0);
			}
			
			if (checkPointInCircle(tempEndX, tempEndY, 0, 0, circleWidth, circleHeight, 1, 1, 0) === true) {
				return true;
			}
			
			let s = circleWidth * circleWidth / 4;
			let t = circleHeight * circleHeight / 4;
			
			let k = tempStartY - (m * tempStartX);
			
			let a = 1 / s + m * m / t;
			let b = 2 * m * k / t;
			let c = k * k / t - 1;
			
			let discrim = b * b - 4 * a * c;
			
			if (discrim < 0) {
				return false;
			}
			
			discrim = Math.sqrt(discrim);
			a *= 2;
			
			return checkBetween((-b - discrim) / a, tempStartX, tempEndX) === true || checkBetween((-b + discrim) / a, tempStartX, tempEndX) === true;
		};
		
		let checkLinePolygon = self.checkLinePolygon = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineRadian,
			
			polygonX, polygonY,
			points,
			polygonScaleX, polygonScaleY,
			polygonRadian
		) => {
			
			let lineTempStartX = lineX;
			let lineTempStartY = lineY;
			
			let lineTempEndX = lineX;
			let lineTempEndY = lineY;
			
			if (lineRadian === 0) {
				
				lineTempStartX += lineStartX * lineScaleX;
				lineTempStartY += lineStartY * lineScaleY;
				
				lineTempEndX += lineEndX * lineScaleX;
				lineTempEndY += lineEndY * lineScaleY;
			}
			
			else {
				
				let cos = Math.cos(lineRadian);
				let sin = Math.sin(lineRadian);
				
				lineTempStartX += cos * lineStartX + sin * lineStartY;
				lineTempStartY += sin * lineStartX + cos * lineStartY;
				
				lineTempEndX += cos * lineEndX + sin * lineEndY;
				lineTempEndY += sin * lineEndX + cos * lineEndY;
			}
			
			let length = points.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = points[i].x * polygonScaleX;
				let iY = points[i].y * polygonScaleY;
				
				let jX = points[j].x * polygonScaleX;
				let jY = points[j].y * polygonScaleY;
				
				let polygonPoint1X, polygonPoint1Y;
				let polygonPoint2X, polygonPoint2Y;
				
				if (polygonRadian === 0) {
					polygonPoint1X = polygonX + iX;	polygonPoint1Y = polygonY + iY;
					polygonPoint2X = polygonX + jX;	polygonPoint2Y = polygonY + jY;
				}
				
				else {
					
					let cos = Math.cos(-polygonRadian);
					let sin = Math.sin(-polygonRadian);
					
					polygonPoint1X = polygonX + cos * iX + sin * iY;	polygonPoint1Y = polygonY - sin * iX + cos * iY;
					polygonPoint2X = polygonX + cos * jX + sin * jY;	polygonPoint2Y = polygonY - sin * jX + cos * jY;
				}
				
				if (checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkRectRect = self.checkRectRect = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aRadian,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bRadian
		) => {
			
			let aPoint1X, aPoint1Y;
			let aPoint2X, aPoint2Y;
			let aPoint3X, aPoint3Y;
			let aPoint4X, aPoint4Y;
			
			aWidth *= aScaleX / 2;
			aHeight *= aScaleY / 2;
			
			if (aRadian === 0) {
				
				aPoint1X = aX - aWidth;	aPoint1Y = aY - aHeight;
				aPoint2X = aX + aWidth;	aPoint2Y = aY - aHeight;
				aPoint3X = aX + aWidth;	aPoint3Y = aY + aHeight;
				aPoint4X = aX - aWidth;	aPoint4Y = aY + aHeight;
			}
			
			else {
				
				let cos = Math.cos(-aRadian);
				let sin = Math.sin(-aRadian);
				
				let cw = cos * aWidth;	let ch = cos * aHeight;
				let sw = sin * aWidth;	let sh = sin * aHeight;
				
				aPoint1X = aX - cw - sh;	aPoint1Y = aY + sw - ch;
				aPoint2X = aX + cw - sh;	aPoint2Y = aY - sw - ch;
				aPoint3X = aX + cw + sh;	aPoint3Y = aY - sw + ch;
				aPoint4X = aX - cw + sh;	aPoint4Y = aY + sw + ch;
			}
			
			let bPoint1X, bPoint1Y;
			let bPoint2X, bPoint2Y;
			let bPoint3X, bPoint3Y;
			let bPoint4X, bPoint4Y;
			
			bWidth *= bScaleX / 2;
			bHeight *= bScaleY / 2;
			
			if (bRadian === 0) {
				
				bPoint1X = bX - bWidth;	bPoint1Y = bY - bHeight;
				bPoint2X = bX + bWidth;	bPoint2Y = bY - bHeight;
				bPoint3X = bX + bWidth;	bPoint3Y = bY + bHeight;
				bPoint4X = bX - bWidth;	bPoint4Y = bY + bHeight;
			}
			
			else {
				
				let cos = Math.cos(-bRadian);
				let sin = Math.sin(-bRadian);
				
				let cw = cos * bWidth;	let ch = cos * bHeight;
				let sw = sin * bWidth;	let sh = sin * bHeight;
				
				bPoint1X = bX - cw - sh;	bPoint1Y = bY + sw - ch;
				bPoint2X = bX + cw - sh;	bPoint2Y = bY - sw - ch;
				bPoint3X = bX + cw + sh;	bPoint3Y = bY - sw + ch;
				bPoint4X = bX - cw + sh;	bPoint4Y = bY + sw + ch;
			}
			
			return checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0) === true ||
				
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0) === true ||
				
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0) === true ||
				
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0) === true;
		};
		
		let checkRectCircle = self.checkRectCircle = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectRadian,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleRadian) => {
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			if (rectRadian === 0) {
				
				rectPoint1X = rectX - rectWidth;	rectPoint1Y = rectY - rectHeight;
				rectPoint2X = rectX + rectWidth;	rectPoint2Y = rectY - rectHeight;
				rectPoint3X = rectX + rectWidth;	rectPoint3Y = rectY + rectHeight;
				rectPoint4X = rectX - rectWidth;	rectPoint4Y = rectY + rectHeight;
			}
			
			else {
				
				let cos = Math.cos(-rectRadian);
				let sin = Math.sin(-rectRadian);
				
				let cw = cos * rectWidth;	let ch = cos * rectHeight;
				let sw = sin * rectWidth;	let sh = sin * rectHeight;
				
				rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
				rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
				rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
				rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			}
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			return checkLineCircle(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, circleX, circleY, circleWidth, circleScaleX, 1, 1, circleRadian) === true ||
				checkLineCircle(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, circleX, circleY, circleWidth, circleScaleX, 1, 1, circleRadian) === true ||
				checkLineCircle(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, circleX, circleY, circleWidth, circleScaleX, 1, 1, circleRadian) === true ||
				checkLineCircle(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, circleX, circleY, circleWidth, circleScaleX, 1, 1, circleRadian) === true;
		};
		
		let checkRectPolygon = self.checkRectPolygon = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectRadian,
			
			polygonX, polygonY,
			points,
			polygonScaleX, polygonScaleY,
			polygonRadian
		) => {
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			if (rectRadian === 0) {
				
				rectPoint1X = rectX - rectWidth;	rectPoint1Y = rectY - rectHeight;
				rectPoint2X = rectX + rectWidth;	rectPoint2Y = rectY - rectHeight;
				rectPoint3X = rectX + rectWidth;	rectPoint3Y = rectY + rectHeight;
				rectPoint4X = rectX - rectWidth;	rectPoint4Y = rectY + rectHeight;
			}
			
			else {
				
				let cos = Math.cos(-rectRadian);
				let sin = Math.sin(-rectRadian);
				
				let cw = cos * rectWidth;	let ch = cos * rectHeight;
				let sw = sin * rectWidth;	let sh = sin * rectHeight;
				
				rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
				rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
				rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
				rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			}
			
			let length = points.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = points[i].x * polygonScaleX;
				let iY = points[i].y * polygonScaleY;
				
				let jX = points[j].x * polygonScaleX;
				let jY = points[j].y * polygonScaleY;
				
				let polygonPoint1X, polygonPoint1Y;
				let polygonPoint2X, polygonPoint2Y;
				
				if (polygonRadian === 0) {
					polygonPoint1X = polygonX + iX;	polygonPoint1Y = polygonY + iY;
					polygonPoint2X = polygonX + jX;	polygonPoint2Y = polygonY + jY;
				}
				
				else {
					
					let cos = Math.cos(-polygonRadian);
					let sin = Math.sin(-polygonRadian);
					
					polygonPoint1X = polygonX + cos * iX + sin * iY;	polygonPoint1Y = polygonY - sin * iX + cos * iY;
					polygonPoint2X = polygonX + cos * jX + sin * jY;	polygonPoint2Y = polygonY - sin * jX + cos * jY;
				}
				
				if (
				checkLineLine(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0) === true ||
				checkLineLine(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkCircleCircle = self.checkCircleCircle = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aRadian,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bRadian
		) => {
			
			aWidth *= aScaleX;
			aHeight *= aScaleY;
			
			bWidth *= bScaleX;
			bHeight *= bScaleY;
			
			bX -= aX;
			bY -= aY;
			aX = aY = 0;
			
			let maxR = ((aWidth > aHeight ? aWidth : aHeight) + (bWidth > bHeight ? bWidth : bHeight)) / 2;
			
			if (bX * bX + bY * bY > maxR * maxR) {
				return false;
			}
			
			if (
			checkPointInCircle(bX, bY, aX, aY, aWidth, aHeight, 1, 1, aRadian) === true ||
			checkPointInCircle(aX, aY, bX, bY, bWidth, bHeight, 1, 1, bRadian) === true) {
				return true;
			}
			
			let A = Math.cos(aRadian);
			let B = Math.sin(aRadian);
			
			let a = A * aX + B * aY;
			let c = -B * aX + A * aY;
			
			B = -B;
			
			let b = aWidth * aWidth / 4;
			let d = aHeight * aHeight / 4;
			
			let aa = (A * A / b) + (B * B / d);
			let ab = (-2 * A * B / b) + (2 * A * B / d);
			let ac = (B * B / b) + (A * A / d);
			let ad = (-2 * a * A / b) - (2 * c * B / d);
			let ae = (2 * a * B / b) - (2 * c * A / d);
			let af = (a * a / b) + (c * c / d) - 1;
			
			A = Math.cos(bRadian);
			B = Math.sin(bRadian);
			
			a = A * bX + B * bY;
			c = -B * bX + A * bY;
			
			B = -B;
			
			b = bWidth * bWidth / 4;
			d = bHeight * bHeight / 4;
			
			let ba = (A * A / b) + (B * B / d);
			let bb = (-2 * A * B / b) + (2 * A * B / d);
			let bc = (B * B / b) + (A * A / d);
			let bd = (-2 * a * A / b) - (2 * c * B / d);
			let be = (2 * a * B / b) - (2 * c * A / d);
			let bf = (a * a / b) + (c * c / d) - 1;
			
			let z0 = af * aa * bd * bd + aa * aa * bf * bf - ad * aa * bd * bf + ba * ba * af * af - 2 * aa * bf * ba * af - ad * bd * ba * af + ba * ad * ad * bf;
			let z1 = be * ad * ad * ba - bf * bd * aa * ab - 2 * aa * bf * ba * ae - af * ba * bb * ad + 2 * bd * bb * aa * af + 2 * be * bf * aa * aa + bd * bd * aa * ae - be * bd * aa * ad - 2 * aa * be * ba * af - af * ba * bd * ab + 2 * af * ae * ba * ba - bf * bb * aa * ad - ae * ba * bd * ad + 2 * bf * ab * ba * d;
			let z2 = be * be * aa * aa + 2 * bc * bf * aa * aa - ae * ba * bd * ab + bf * ba * ab * ab - ae * ba * bb * ad - bf * bb * aa * ab - 2 * aa * be * ba * ae + 2 * bd * bb * aa * ae - bc * bd * aa * ad - 2 * aa * bc * ba * af + bb * bb * aa * af + 2 * be * ab * ba * ad + ae * ae * ba * ba - ac * ba * bd * ad - be * bb * aa * ad + 2 * af * ac * ba * ba - af * ba * bb * ab + bc * ad * ad * ba + bd * bd * aa * ac - be * bd * aa * ab - 2 * aa * bf * ba * c;
			let z3 = -2 * aa * ba * ac * be + be * ba * ab * ab + 2 * bc * ab * ba * ad - ac * ba * bb * ad + bb * bb * aa * ae - be * bb * aa * ab - 2 * aa * bc * ba * ae - ae * ba * bb * ab - bc * bb * aa * ad + 2 * be * bc * aa * aa + 2 * ae * ac * ba * ba - ac * ba * bd * ab + 2 * bd * bb * aa * ac - bc * bd * aa * b;
			let z4 = aa * aa * bc * bc - 2 * aa * bc * ba * ac + ba * ba * ac * ac - ab * aa * bb * bc - ab * bb * ba * ac + ab * ab * ba * bc + ac * aa * bb * bb;
			
			if (z0 === 0) {
				return true;
			}
			
			if (z4 === 0) {
				if (z3 !== 0) {
					return true;
				}
				
				if (z2 !== 0) {
					return (z1 * z1 - 4 * z2 * z0) >= 0;
				}
				
				return z1 !== 0;
			}
			
			let za = z3 / z4;
		    let zb = z2 / z4;
		    let zc = z1 / z4;
		    let zd = z0 / z4;
		    let zp = (8 * zb - 3 * za * za) / 8;
			let zq = (za * za * za - 4 * za * zb + 8 * zc) / 8;
			let zr = (-3 * za * za * za * za + 256 * zd - 64 * zc * za + 16 * za * za * zb) / 256;
			
			let descrim = 256 * zr * zr * zr - 128 * zp * zp * zr * zr + 144 * zp * zq * zq * zr - 27 * zq * zq * zq * zq + 16 * zp * zp * zp * zp * zr - 4 * zp * zp * zp * zq * zq;
			let P = 8 * zp;
			let D = 64 * zr - 16 * zp * zp;

			return descrim < 0 || (descrim > 0 && P < 0 && D < 0) || (descrim === 0 && (D !== 0 || P <= 0));
		};
		
		let checkCirclePolygon = self.checkCirclePolygon = (
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleRadian,
			
			polygonX, polygonY,
			points,
			polygonScaleX, polygonScaleY,
			polygonRadian) => {
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let length = points.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = points[i].x * polygonScaleX;
				let iY = points[i].y * polygonScaleY;
				
				let jX = points[j].x * polygonScaleX;
				let jY = points[j].y * polygonScaleY;
				
				let polygonPoint1X, polygonPoint1Y;
				let polygonPoint2X, polygonPoint2Y;
				
				if (polygonRadian === 0) {
					polygonPoint1X = polygonX + iX;	polygonPoint1Y = polygonY + iY;
					polygonPoint2X = polygonX + jX;	polygonPoint2Y = polygonY + jY;
				}
				
				else {
					
					let cos = Math.cos(-polygonRadian);
					let sin = Math.sin(-polygonRadian);
					
					polygonPoint1X = polygonX + cos * iX + sin * iY;	polygonPoint1Y = polygonY - sin * iX + cos * iY;
					polygonPoint2X = polygonX + cos * jX + sin * jY;	polygonPoint2Y = polygonY - sin * jX + cos * jY;
				}
				
				if (checkLineCircle(0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, circleX, circleY, circleWidth, circleHeight, 1, 1, circleRadian) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkPolygonPolygon = self.checkPolygonPolygon = (
			aX, aY,
			aPoints,
			aScaleX, aScaleY,
			aRadian,
			
			bX, bY,
			bPoints,
			bScaleX, bScaleY,
			bRadian
		) => {
			
			let aLength = aPoints.length;
			let bLength = bPoints.length;
			
			for (let i = 0, j = aLength - 1; i < aLength; j = i, i += 1) {
				
				let iX = aPoints[i].x * aScaleX;
				let iY = aPoints[i].y * aScaleY;
				
				let jX = aPoints[j].x * aScaleX;
				let jY = aPoints[j].y * aScaleY;
				
				let aPoint1X, aPoint1Y;
				let aPoint2X, aPoint2Y;
				
				if (aRadian === 0) {
					aPoint1X = aX + iX;	aPoint1Y = aY + iY;
					aPoint2X = aX + jX;	aPoint2Y = aY + jY;
				}
				
				else {
					
					let cos = Math.cos(-aRadian);
					let sin = Math.sin(-aRadian);
					
					aPoint1X = aX + cos * iX + sin * iY;	aPoint1Y = aY - sin * iX + cos * iY;
					aPoint2X = aX + cos * jX + sin * jY;	aPoint2Y = aY - sin * jX + cos * jY;
				}
				
				for (let k = 0, l = bLength - 1; k < bLength; l = k, k += 1) {
					
					let kX = bPoints[k].x * bScaleX;
					let kY = bPoints[k].y * bScaleY;
					
					let lX = bPoints[l].x * bScaleX;
					let lY = bPoints[l].y * bScaleY;
					
					let bPoint1X, bPoint1Y;
					let bPoint2X, bPoint2Y;
					
					if (bRadian === 0) {
						bPoint1X = bX + kX;	bPoint1Y = bY + kY;
						bPoint2X = bX + lX;	bPoint2Y = bY + lY;
					}
					
					else {
						
						let cos = Math.cos(-bRadian);
						let sin = Math.sin(-bRadian);
						
						bPoint1X = bX + cos * kX + sin * kY;	bPoint1Y = bY - sin * kX + cos * kY;
						bPoint2X = bX + cos * lX + sin * lY;	bPoint2Y = bY - sin * lX + cos * lY;
					}
					
					if (checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0) === true) {
						return true;
					}
				}
			}
			
			return false;
		};
	}
});
