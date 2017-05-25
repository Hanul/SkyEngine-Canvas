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
			rectSin, rectCos
		) => {
			
			pointX -= rectX;
			pointY -= rectY;
			
			let tempX = rectX + rectCos * pointX + rectSin * pointY;
			let tempY = rectY - rectSin * pointX + rectCos * pointY;
			
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
			circleSin, circleCos
		) => {
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			pointX -= circleX;
			pointY -= circleY;

			let tempX = 2 * (circleCos * pointX + circleSin * pointY) / circleWidth;
			let tempY = 2 * (circleSin * pointX - circleCos * pointY) / circleHeight;
			
			return tempX * tempX + tempY * tempY <= 1;
		};
		
		let checkPointInPolygon = self.checkPointInPolygon = (
			pointX, pointY,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			pointX -= polygonX;
			pointY -= polygonY;
			
			let tempX = polygonX + polygonCos * pointX + polygonSin * pointY;
			let tempY = polygonY - polygonSin * pointX + polygonCos * pointY;
			
			tempX -= polygonX;
			tempY -= polygonY;
			
			let result = false;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
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
			aSin, aCos,
			
			bX, bY,
			bStartX, bStartY,
			bEndX, bEndY,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			aStartX *= aScaleX;
			aStartY *= aScaleY;
			
			let aTempStartX = aX + aCos * aStartX + aSin * aStartY;
			let aTempStartY = aY + aSin * aStartX + aCos * aStartY;
				
			aEndX *= aScaleX;
			aEndY *= aScaleY;
			
			let aTempEndX = aX + aCos * aEndX + aSin * aEndY;
			let aTempEndY = aY + aSin * aEndX + aCos * aEndY;
			
			bStartX *= bScaleX;
			bStartY *= bScaleY;
			
			let bTempStartX = bX + bCos * bStartX + bSin * bStartY;
			let bTempStartY = bY + bSin * bStartX + bCos * bStartY;
			
			bEndX *= bScaleX;
			bEndY *= bScaleY;
			
			let bTempEndX = bX + bCos * bEndX + bSin * bEndY;
			let bTempEndY = bY + bSin * bEndX + bCos * bEndY;
			
			let denom = (aTempEndX - aTempStartX) * (bTempEndY - bTempStartY) - (bTempEndX - bTempStartX) * (aTempEndY - aTempStartY);
			
			if (denom === 0) {
				return false;
			}
			
			else {
				
				let ua = ((bTempEndY - bTempStartY) * (bTempEndX - aTempStartX) + (bTempStartX - bTempEndX) * (bTempEndY - aTempStartY)) / denom;
				let ub = ((aTempStartY - aTempEndY) * (bTempEndX - aTempStartX) + (aTempEndX - aTempStartX) * (bTempEndY - aTempStartY)) / denom;
				
				return 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1;
			}
		};
		
		let checkLineRect = self.checkLineRect = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
			let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			return checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1) === true;
		};
		
		let checkLineCircle = self.checkLineCircle = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY - circleX;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY - circleY;
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY - circleX;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY - circleY;
			
			let tempStartX = circleCos * lineTempStartX + circleSin * lineTempStartY;
			let tempStartY = -circleSin * lineTempStartX + circleCos * lineTempStartY;
			
			let tempEndX = circleCos * lineTempEndX + circleSin * lineTempEndY;
			let tempEndY = -circleSin * lineTempEndX + circleCos * lineTempEndY;
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let m = (tempEndY - tempStartY) / (tempEndX - tempStartX);
			
			if (Math.abs(m) > 1024) {
				return checkLineCircle(0, 0, tempStartY, tempStartX, tempEndY, tempEndX, 1, 1, 0, 1, 0, 0, circleHeight, circleWidth, 1, 1, 0, 1);
			}
			
			if (checkPointInCircle(tempEndX, tempEndY, 0, 0, circleWidth, circleHeight, 1, 1, 0, 1) === true) {
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
			lineSin, lineCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkRectRect = self.checkRectRect = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			let aPoint1X, aPoint1Y;
			let aPoint2X, aPoint2Y;
			let aPoint3X, aPoint3Y;
			let aPoint4X, aPoint4Y;
			
			aWidth *= aScaleX / 2;
			aHeight *= aScaleY / 2;
			
			let aCW = aCos * aWidth;	let aCH = aCos * aHeight;
			let aSW = -aSin * aWidth;	let aSH = -aSin * aHeight;
			
			aPoint1X = aX - aCW - aSH;	aPoint1Y = aY + aSW - aCH;
			aPoint2X = aX + aCW - aSH;	aPoint2Y = aY - aSW - aCH;
			aPoint3X = aX + aCW + aSH;	aPoint3Y = aY - aSW + aCH;
			aPoint4X = aX - aCW + aSH;	aPoint4Y = aY + aSW + aCH;
			
			let bPoint1X, bPoint1Y;
			let bPoint2X, bPoint2Y;
			let bPoint3X, bPoint3Y;
			let bPoint4X, bPoint4Y;
			
			bWidth *= bScaleX / 2;
			bHeight *= bScaleY / 2;
			
			let bCW = bCos * bWidth;	let bCH = bCos * bHeight;
			let bSW = -bSin * bWidth;	let bSH = -bSin * bHeight;
			
			bPoint1X = bX - bCW - bSH;	bPoint1Y = bY + bSW - bCH;
			bPoint2X = bX + bCW - bSH;	bPoint2Y = bY - bSW - bCH;
			bPoint3X = bX + bCW + bSH;	bPoint3Y = bY - bSW + bCH;
			bPoint4X = bX - bCW + bSH;	bPoint4Y = bY + bSW + bCH;
			
			return checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true;
		};
		
		let checkRectCircle = self.checkRectCircle = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) => {
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
			let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			return checkLineCircle(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true;
		};
		
		let checkRectPolygon = self.checkRectPolygon = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
			let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (
				checkLineLine(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkCircleCircle = self.checkCircleCircle = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bSin, bCos
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
			checkPointInCircle(bX, bY, aX, aY, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
			checkPointInCircle(aX, aY, bX, bY, bWidth, bHeight, 1, 1, bSin, bCos) === true) {
				return true;
			}
			
			let a = aCos * aX + aSin * aY;
			let c = -aSin * aX + aCos * aY;
			
			aSin = -aSin;
			
			let b = aWidth * aWidth / 4;
			let d = aHeight * aHeight / 4;
			
			let aa = (aCos * aCos / b) + (aSin * aSin / d);
			let ab = (-2 * aCos * aSin / b) + (2 * aCos * aSin / d);
			let ac = (aSin * aSin / b) + (aCos * aCos / d);
			let ad = (-2 * a * aCos / b) - (2 * c * aSin / d);
			let ae = (2 * a * aSin / b) - (2 * c * aCos / d);
			let af = (a * a / b) + (c * c / d) - 1;
			
			a = bCos * bX + bSin * bY;
			c = -bSin * bX + bCos * bY;
			
			bSin = -bSin;
			
			b = bWidth * bWidth / 4;
			d = bHeight * bHeight / 4;
			
			let ba = (bCos * bCos / b) + (bSin * bSin / d);
			let bb = (-2 * bCos * bSin / b) + (2 * bCos * bSin / d);
			let bc = (bSin * bSin / b) + (bCos * bCos / d);
			let bd = (-2 * a * bCos / b) - (2 * c * bSin / d);
			let be = (2 * a * bSin / b) - (2 * c * bCos / d);
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
			circleSin, circleCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (checkLineCircle(0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkPolygonPolygon = self.checkPolygonPolygon = (
			aX, aY,
			aPoints,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bPoints,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			let aLength = aPoints.length;
			let bLength = bPoints.length;
			
			for (let i = 0, j = aLength - 1; i < aLength; j = i, i += 1) {
				
				let iX = aPoints[i].x * aScaleX;
				let iY = aPoints[i].y * aScaleY;
				
				let jX = aPoints[j].x * aScaleX;
				let jY = aPoints[j].y * aScaleY;
				
				let aPoint1X = aX + aCos * iX - aSin * iY;
				let aPoint1Y = aY + aSin * iX + aCos * iY;
				
				let aPoint2X = aX + aCos * jX - aSin * jY;
				let aPoint2Y = aY + aSin * jX + aCos * jY;
				
				for (let k = 0, l = bLength - 1; k < bLength; l = k, k += 1) {
					
					let kX = bPoints[k].x * bScaleX;
					let kY = bPoints[k].y * bScaleY;
					
					let lX = bPoints[l].x * bScaleX;
					let lY = bPoints[l].y * bScaleY;
					
					let bPoint1X = bX + bCos * kX - bSin * kY;
					let bPoint1Y = bY + bSin * kX + bCos * kY;
					
					let bPoint2X = bX + bCos * lX - bSin * lY;
					let bPoint2Y = bY + bSin * lX + bCos * lY;
					
					if (checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true) {
						return true;
					}
				}
			}
			
			return false;
		};
	}
});
