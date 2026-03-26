export const checkTimelineDirection = (index: number) => index % 2 !== 0;

export const generatePath = (heights: number[]): string => {
	if (heights.length < 2) {
		return '';
	}

	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
	const startY = isDesktop ? 42 : 10;
	const curveWidth = 20;
	const curveHeight = 40;

	let result = `M 0,${heights[0] + startY} `;

	for (let i = 0; i < heights.length - 1; i++) {
		const currentY = heights[i] + startY;
		const nextY = heights[i + 1] + startY;
		const isLeft = checkTimelineDirection(i);

		const side = isLeft ? -curveWidth : curveWidth;

		const startCurveY = currentY + 15;
		result += `L 0,${startCurveY} `;

		const endCurveOutY = startCurveY + curveHeight;
		result += `C 0,${startCurveY + curveHeight * 0.4} ${side},${startCurveY + curveHeight * 0.6} ${side},${endCurveOutY} `;

		const startCurveBackY = nextY - curveHeight - 15;
		if (startCurveBackY > endCurveOutY) {
			result += `L ${side},${startCurveBackY} `;
		}

		const backStartY = Math.max(endCurveOutY, startCurveBackY);

		const endCurveBackY = nextY - 15;
		result += `C ${side},${backStartY + curveHeight * 0.4} 0,${endCurveBackY - curveHeight * 0.6} 0,${endCurveBackY} `;

		result += `L 0,${nextY} `;
	}

	return result;
};
