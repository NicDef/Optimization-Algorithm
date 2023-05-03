'use strict';

/**
 * Generates a random landscape with multiple local minima and maxima.
 * And draws it on the canvas
 * @param {int} stepMax
 * @param {int} stepChange
 * @returns set [Array with height values]
 */
function generateTerrain(stepMax, stepChange) {
	var set = [];

	// javascript graphics boilerplate
	var c = document.getElementById('canvas');
	c.width = document.body.clientWidth;
	c.height = document.body.clientHeight;

	if (c.getContext) {
		var ctx = canvas.getContext('2d');
	} else {
		alert('Dein Browser unterstützt das <canvas> Element nicht');
		return;
	}

	// parameters - change to your liking
	var STEP_MAX = stepMax;
	var STEP_CHANGE = stepChange;
	var HEIGHT_MAX = c.height;

	// starting conditions
	var height = Math.floor(Math.random() * HEIGHT_MAX);
	// alert(height);
	var slope = Math.random() * STEP_MAX * 2 - STEP_MAX;

	// creating the landscape
	for (var x = 0; x < c.width; x++) {
		// change height and slope
		height += slope;
		slope += Math.random() * STEP_CHANGE * 2 - STEP_CHANGE;

		// clip height and slope to maximum
		if (slope > STEP_MAX) {
			slope = STEP_MAX;
		}
		if (slope < -STEP_MAX) {
			slope = -STEP_MAX;
		}

		if (height > HEIGHT_MAX) {
			height = HEIGHT_MAX;
			slope *= -1;
		}
		if (height < 0) {
			height = 0;
			slope *= -1;
		}

		// draw column
		if (height < HEIGHT_MAX) {
			ctx.strokeStyle = `rgb(90, 18, 18, 70%`;
			ctx.beginPath();
			ctx.moveTo(x, HEIGHT_MAX);
			ctx.lineTo(x, Math.floor(height));
			ctx.stroke();
		}

		set.push(Math.floor(height));
	}

	return set;
}

var hill = [];
hill = generateTerrain(1.5, 0.5);
