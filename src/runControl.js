import { cellsize, renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { resetRunningValues, X, Y } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";
import * as bfs from "./algorithms/breathFirstSearch.js";
import * as dfs from "./algorithms/depthFirstSearch.js";
import * as aStarM from "./algorithms/AStar.js";
import * as aStarO from "./algorithms/optimizedAStar.js";
import { calcRouteStep } from "./algorithms/routegenerator.js";
import * as audio from "./audiogenerator.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");
const startBtn = document.getElementById("runBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSlider = document.getElementById("speedSlider");
const algorithmSelector = document.getElementById("AlgorithmSelector");
const statIterations = document.getElementById("statIterations");
const statRouteLength = document.getElementById("statRouteLength");
const statDiscovered = document.getElementById("statDiscovered");
const cellSizeSlider = document.getElementById("cellSizeSlider");
const debugBtn = document.getElementById("debugBtn");

export let status = "IDLE";
export function setStatus(x) {
	status = x;
}
let speed = 32;
let iterationCount = 0;
let routeLength = 0;

//Initialize grid
initArray(720 / 24, 360 / 24);
renderGrid();

//Default algorithm functions
let algInit = bfs.init;
let algDoStep = bfs.doStep;
let algReset = bfs.reset;

//Updates the picture Buttons to Play/Step
function setButtonsPlay() {
	startBtn.innerHTML = '<img src="icons/icons8-play-48.png" alt="start"></img>';
	stopBtn.innerHTML = '<img src="icons/icons8-next-48.png" alt="start"></img>';
}

//Updates the picture Buttons to Pause/Stop
function setButtonsPause() {
	startBtn.innerHTML =
		'<img src="icons/icons8-pause-48.png" alt="start"></img>';
	stopBtn.innerHTML = '<img src="icons/icons8-stop-48.png" alt="start"></img>';
}

function setIterationCount(n) {
	iterationCount = n;
	var perentage = Math.round((iterationCount / (X * Y)) * 1000) / 10;
	if (iterationCount == 0) {
		statIterations.innerHTML = "Iterations: --";
		statDiscovered.innerHTML = "Discovered: --";
	} else {
		statIterations.innerHTML = "Iterations: " + iterationCount;
		statDiscovered.innerHTML = "Discovered: " + perentage + "%";
	}
}

function setRouteLength(n) {
	routeLength = n;
	if (routeLength == 0) statRouteLength.innerHTML = "Route length: --";
	else statRouteLength.innerHTML = "Route length: " + routeLength;
}

function resetAllValues() {
	status = "IDLE";
	setButtonsPlay();
	algorithmSelector.disabled = false;
	cellSizeSlider.disabled = false;
	resetRunningValues();
	algReset();
}

let f = 250;
debugBtn.addEventListener("click", (e) => {
	f *= 1.05;
	audio.click(f);
	debugBtn.innerHTML = f;
});

generateMazeBtn.addEventListener("click", (e) => {
	if (status == "IDLE") {
		status == "GENERATING";
		cellSizeSlider.disabled = true;
		generateMaze();
	}
});

startBtn.addEventListener("click", (e) => {
	switch (status) {
		case "IDLE":
			status = "RUNNING";
			setButtonsPause();
			algorithmSelector.disabled = true;
			cellSizeSlider.disabled = true;

			algInit();
			run();
			break;

		case "RUNNING":
			status = "PAUSED";
			audio.stop();

			setButtonsPlay();
			break;

		case "PAUSED":
			status = "RUNNING";
			setButtonsPause();
			run();
			break;

		case "DRAWINGROUTE":
			status = "DRAWINGROUTEPAUSED";
			setButtonsPlay();
			break;

		case "DRAWINGROUTEPAUSED":
			status = "DRAWINGROUTE";
			setButtonsPause();
			run();
			break;

		case "FINISHED":
			resetAllValues();
			setRouteLength(0);
			setIterationCount(0);
			break;

		default:
			break;
	}
});

stopBtn.addEventListener("click", (e) => {
	switch (status) {
		case "RUNNING":
			resetAllValues();
			setRouteLength(0);
			setIterationCount(0);
			audio.stop();

			break;

		case "PAUSED":
			var cell = algDoStep();
			audio.click(cell[0], cell[1]);
			setIterationCount(iterationCount + 1);
			break;

		case "DRAWINGROUTEPAUSED":
			calcRouteStep();
			setRouteLength(routeLength + 1);
			break;

		case "FINISHED":
			resetAllValues();
			setRouteLength(0);
			setIterationCount(0);
			break;

		default:
			break;
	}
});

//Update Speed
speedSlider.addEventListener("input", function () {
	speed = 2 ** this.value;
});

//Update Selected algorithm
algorithmSelector.addEventListener("change", (e) => {
	switch (e.target.value) {
		case "BFS":
			algDoStep = bfs.doStep;
			algInit = bfs.init;
			algReset = bfs.reset;
			break;
		case "DFS":
			algDoStep = dfs.doStep;
			algInit = dfs.init;
			algReset = dfs.reset;
			break;
		case "A*M":
			algDoStep = aStarM.doStep;
			algInit = aStarM.init;
			algReset = aStarM.reset;
			break;
		case "A*O":
			algDoStep = aStarO.doStep;
			algInit = aStarO.init;
			algReset = aStarO.reset;
			break;
		default:
			break;
	}
});

function handleAudio(cell) {
	if (speed > 100) {
		audio.stop();
		audio.click(cell[0], cell[1]);
	} else {
		audio.start();
		console.log(cell);
		audio.setFrequency(cell[0], cell[1]);
	}
}

async function run() {
	await new Promise((r) => setTimeout(r, speed));

	switch (status) {
		case "RUNNING":
			var cell = algDoStep();
			setIterationCount(iterationCount + 1);

			handleAudio(cell);

			run();
			break;
		case "DRAWINGROUTE":
			cell = calcRouteStep();

			handleAudio(cell);

			setRouteLength(routeLength + 1);
			run();
			break;
		case "FINISHED":
			audio.stop();

			startBtn.innerHTML =
				'<img src="icons/icons8-reset-50.png" alt="start"></img>';
			break;
		default:
			break;
	}
}
