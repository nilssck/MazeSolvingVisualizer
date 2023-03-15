import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { resetRunningValues } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";
import * as bfs from "./algorithms/breathFirstSearch.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");
const startBtn = document.getElementById("runBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSlider = document.getElementById("speedSlider");

export let status = "IDLE";
export function setStatus(x) {
	status = x;
}

initArray(720 / 24, 360 / 24);
renderGrid();

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
		status = "RUNNING";
		setButtonsPause();

		bfs.init();
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
		status = "IDLE";
		setButtonsPlay();
		resetRunningValues();
		bfs.reset();
	}

	//Execute step
	else if (status == "PAUSED") {
		console.log("penis");
		bfs.doStep();
	}
});

async function run() {
	if (status == "RUNNING") {
		bfs.doStep();
		await new Promise((r) => setTimeout(r, 100));
		run();
	}
}
