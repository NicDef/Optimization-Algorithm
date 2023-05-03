'use strict';

import { drawLine, drawPlainLandscape } from './drawingTools.js';
import StateSpace from './stateSpace.js';
import Algorithm from './algorithm.js';
import { temp, coolingRate, simSpeed, updateParameters, toggleSettingsVisibility } from './ui.js';
import beep from './beepSound.js';

let currentFrame = null;

const scene = {
	stateSpace: {},
	currState: {},
};

function initialize() {
	// Algorithm dependants
	scene.stateSpace = new StateSpace();
	scene.stateSpace.scores = hill;
	scene.currState = scene.stateSpace.randomState();
	scene.canvas = document.getElementById('canvas'); // add global pointer to the canvas
}
initialize();

// Option for the Algorithm
var opts = {
	initialTemp: temp,
	coolingRate: coolingRate,
	algorithm: Algorithm,
	keyframe: simSpeed, // frames between changes
	stepSize: document.body.clientWidth,
};

document.querySelector('.start-btn').addEventListener('click', () => {
	if (document.body.clientWidth != document.getElementById('canvas').width) {
		hill = generateTerrain(1.5, 0.5);
		initialize();
	} else {
		run(opts); // Run the algorithm
	}
});

document.querySelector('.refresh-btn').addEventListener('click', () => {
	terminate();
	hill = generateTerrain(1.5, 0.5);
	initialize();
});

document.querySelector('.settings-btn').addEventListener('click', () => {
	toggleSettingsVisibility();
});

document.querySelector('.submit').addEventListener('click', () => {
	updateParameters();
	initialize();
	opts = {
		initialTemp: temp,
		coolingRate: coolingRate,
		algorithm: Algorithm,
		keyframe: simSpeed, // frames between changes
		stepSize: document.body.clientWidth,
	};
});

/**
 * Pulls from global scene to do work.
 * Dependency on globals is a little sloppy,
 * but fine for this demo
 * @return {[type]} [description]
 */
function frame() {
	// Update Scene only at intervals set by keyframe
	currentFrame = window.requestAnimationFrame(frame);
	if (scene.time % scene.keyframe === 0) {
		drawPlainLandscape(scene.canvas, hill); // Remove line from hill
		scene.currState = Algorithm.simulatedAnnealing(scene.currState, scene.stateSpace, scene.temp, scene.stepSize);
		scene.temp *= scene.coolingRate; // apply cooling
		// console.log(scene.temp);
		drawLine(scene.currState.coords, scene.currState.score, `#4657F2`);
		beep(simSpeed, scene.currState.coords[0] + 800, 5);
	}
	scene.time += 1;

	// Break condition
	if (scene.temp <= 0.1) {
		terminate();
		console.log(scene);
		drawPlainLandscape(scene.canvas, hill); // Remove line from hill
		drawLine(scene.currState.coords, 100, `#D73030`);
	}
}

/**
 * Applies options to the algorithm.
 * Runs it by calling frame() function
 */
function run(opts) {
	terminate();
	console.log(hill);
	console.log(scene);
	if (currentFrame) {
		window.cancelAnimationFrame(currentFrame);
	}
	const options = opts || {};
	scene.temp = options.initialTemp;
	scene.coolingRate = options.coolingRate;
	scene.algorithm = options.algorithm;
	scene.keyframe = options.keyframe; // frames between changes
	scene.stepSize = options.stepSize;
	scene.time = 0;
	frame();
}

/**
 * Stops the Algorithm
 */
function terminate() {
	if (currentFrame) {
		window.cancelAnimationFrame(currentFrame);
	}
}
