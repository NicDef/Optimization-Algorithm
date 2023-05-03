/**
 * Draw a vertical line on the canvas from a specific height and with a specific color
 * @param {int} posX
 * @param {int} value
 * @param {string} color
 */
function drawLine(posX, value, color) {
	// Setup
	var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(posX, value);
	ctx.lineTo(posX, c.clientHeight);
	ctx.strokeStyle = color || `rgb(90, 18, 18, 70%`;
	ctx.stroke();
}

/**
 *  Draws plain hill based on arr parameter
 * @param {*} canvas
 * @param {*} arr
 */
function drawPlainLandscape(canvas, arr) {
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	// creating the landscape
	for (var x = 0; x < canvas.width; x++) {
		drawLine(x, arr[x]);
	}
}

export { drawLine, drawPlainLandscape };
