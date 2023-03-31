import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { resetRunningValues } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";
import * as bfs from "./algorithms/breathFirstSearch.js";
import * as dfs from "./algorithms/depthFirstSearch.js";
import * as aStarM from "./algorithms/AStar.js";
import * as aStarO from "./algorithms/optimizedAStar.js";
import { calcRouteStep } from "./algorithms/routegenerator.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");
const startBtn = document.getElementById("runBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSlider = document.getElementById("speedSlider");
const algorithmSelector = document.getElementById("AlgorithmSelector");
const debugBtn = document.getElementById("debugBtn");

export let status = "IDLE";
export function setStatus(x) {
	status = x;
}
let speed = 100;

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

function resetAllValues() {
	status = "IDLE";
	setButtonsPlay();
	algorithmSelector.disabled = false;
	resetRunningValues();
	algReset();
}

let l = 0;
debugBtn.addEventListener("click", (e) => {
	if (l == 0) {
		aStar.init();
		l++;
	} else {
		aStar.doStep();
	}
});

generateMazeBtn.addEventListener("click", (e) => {
	if (status == "IDLE") {
		status == "GENERATING";
		generateMaze();
	}
});

startBtn.addEventListener("click", (e) => {
	switch (status) {
		case "IDLE":
			status = "RUNNING";
			setButtonsPause();
			algorithmSelector.disabled = true;

			algInit();
			run();
			break;

		case "RUNNING":
			status = "PAUSED";
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
			break;

		default:
			break;
	}
});

stopBtn.addEventListener("click", (e) => {
	switch (status) {
		case "RUNNING":
			resetAllValues();
			break;

		case "PAUSED":
			algDoStep();
			break;

		case "DRAWINGROUTEPAUSED":
			calcRouteStep();
			break;

		case "FINISHED":
			resetAllValues();
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

async function run() {
	await new Promise((r) => setTimeout(r, speed));

	switch (status) {
		case "RUNNING":
			algDoStep();
			run();
			break;
		case "DRAWINGROUTE":
			calcRouteStep();
			run();
			break;
		case "FINISHED":
			startBtn.innerHTML =
				'<img src="icons/icons8-reset-50.png" alt="start"></img>';
			break;
		default:
			break;
	}
}
