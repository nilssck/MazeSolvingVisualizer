import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { resetRunningValues } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";
import * as bfs from "./algorithms/breathFirstSearch.js";
import * as dfs from "./algorithms/depthFirstSearch.js";
import { calcRouteStep } from "./algorithms/routegenerator.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");
const startBtn = document.getElementById("runBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSlider = document.getElementById("speedSlider");
const algorithmSelector = document.getElementById("AlgorithmSelector");

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

generateMazeBtn.addEventListener("click", (e) => {
	if (status == "IDLE") {
		status == "GENERATING";
		generateMaze();
	}
});

startBtn.addEventListener("click", (e) => {
	//Start
	if (status == "IDLE") {
		//Update Status and UI
		status = "RUNNING";
		setButtonsPause();
		algorithmSelector.disabled = true;

		algInit();
		run();
	}

	//Pause
	else if (status == "RUNNING") {
		status = "PAUSED";
		setButtonsPlay();
	}

	//Resume
	else if ((status = "PAUSED")) {
		status = "RUNNING";
		setButtonsPause();
		run();
	}
});

stopBtn.addEventListener("click", (e) => {
	//Stop running
	if (status == "RUNNING") {
		//Update Status and UI
		status = "IDLE";
		setButtonsPlay();
		algorithmSelector.disabled = false;

		//Reset Data
		resetRunningValues();
		algReset();
	}

	//Execute step
	else if (status == "PAUSED") {
		algDoStep();
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
		case "A*":
			//TODO
			break;
		default:
			break;
	}
});

async function run() {
	await new Promise((r) => setTimeout(r, speed));
	if (status == "RUNNING") {
		algDoStep();
		run();
	} else if (status == "DRAWINGROUTE") {
		calcRouteStep();
		run();
	} else if (status == "FINISHED") {
		//TODO Set button to reset
	}
}
