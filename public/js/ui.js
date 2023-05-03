'use strict';

let temp = document.getElementById('temperature').value;
let coolingRate = document.getElementById('coolingRate').value;
let simSpeed = document.getElementById('simulationSpeed').value;

// const socket = io();

function updateParameters() {
	const DEFAULT_TEMP = 10;
	const DEFAULT_COOLING_RATE = 0.95;
	const DEFAULT_SIM_SPEED = 5;

	temp = document.getElementById('temperature').value;
	coolingRate = document.getElementById('coolingRate').value;
	simSpeed = document.getElementById('simulationSpeed').value;

	if (temp < 1 || temp == '' || isNaN(temp)) temp = DEFAULT_TEMP;
	if (coolingRate == 0 || coolingRate == '' || isNaN(coolingRate)) coolingRate = DEFAULT_COOLING_RATE;
	if (simSpeed <= 1 || simSpeed == '' || isNaN(simSpeed)) simSpeed = DEFAULT_SIM_SPEED;

	document.getElementById('temperature').value = temp;
	document.getElementById('coolingRate').value = coolingRate;
	document.getElementById('simulationSpeed').value = simSpeed;

	document.querySelector('.settings').style.visibility = 'hidden';
}

document.querySelector('.settings').style.visibility = 'hidden';
function toggleSettingsVisibility() {
	const elem = document.querySelector('.settings').style;

	if (elem.visibility == 'hidden') {
		elem.visibility = 'visible';
	} else {
		elem.visibility = 'hidden';
	}
}

export { temp, coolingRate, simSpeed, updateParameters, toggleSettingsVisibility };
