import { breathFirstSearch } from "../algorithms/breathFirstSearch.js";
import * as gridRenderer from "./gridRenderer.js";
import * as gridManager from "./gridManager.js";

const canvas = document.getElementById("mainGrid");

const brushBtn = document.getElementById("brushBtn");
const eraseBtn = document.getElementById("eraseBtn");
const setStartBtn = document.getElementById("setStartBtn");
const setEndBtn = document.getElementById("setEndBtn");
const activeBrushSelector = document.getElementById("activeBrushSelector");
const startBtn = document.getElementById("runBtn");
const cellSizeSlider = document.getElementById("cellSizeSlider");
const debugText = document.getElementById("Debug");

const POSSIBLECELLSIZES = [
	5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90,
];

let drawMode = "Draw";

//============== Grid Drawing ==============//

canvas.addEventListener("mousemove", (e) => {
	//button pressed?
	if (e.buttons !== 1) return;
	draw(e);
});
canvas.addEventListener("mousedown", draw);

function draw(e) {
	let mousePos = {};
	//get position
	mousePos.x = e.x - canvas.getBoundingClientRect().left;
	mousePos.y = e.y - canvas.getBoundingClientRect().top;

	//get cell
	let cell = {
		x: Math.floor(mousePos.x / gridRenderer.cellsize),
		y: Math.floor(mousePos.y / gridRenderer.cellsize),
	};

	switch (drawMode) {
		case "Draw":
			if (gridManager.setWall(cell.x, cell.y)) {
				gridRenderer.fillCell(cell.x, cell.y, gridRenderer.WHITE);
			}
			break;

		case "Erase":
			if (gridManager.removeWall(cell.x, cell.y)) {
				gridRenderer.fillCell(cell.x, cell.y, gridRenderer.BLACK);
			}
			break;

		case "Start":
			gridRenderer.fillCell(
				gridManager.start[0],
				gridManager.start[1],
				gridRenderer.BLACK
			);
			gridRenderer.fillCell(cell.x, cell.y, gridRenderer.GREEN);

			gridManager.setStart(cell.x, cell.y);

			//Reset
			handleHighlightBtn(brushBtn);
			drawMode = "Draw";
			break;

		case "End":
			gridRenderer.fillCell(
				gridManager.end[0],
				gridManager.end[1],
				gridRenderer.BLACK
			);
			gridRenderer.fillCell(cell.x, cell.y, gridRenderer.RED);
			gridManager.setEnd(cell.x, cell.y);

			//Reset
			handleHighlightBtn(brushBtn);
			drawMode = "Draw";
			break;

		default:
			break;
	}
}

//============== Brush Buttons ==============//
brushBtn.addEventListener("click", (e) => {
	drawMode = "Draw";
	handleHighlightBtn(brushBtn);
});

eraseBtn.addEventListener("click", (e) => {
	drawMode = "Erase";
	handleHighlightBtn(eraseBtn);
});

setStartBtn.addEventListener("click", (e) => {
	drawMode = "Start";
	handleHighlightBtn(setStartBtn);
});

setEndBtn.addEventListener("click", (e) => {
	drawMode = "End";
	handleHighlightBtn(setEndBtn);
});

startBtn.addEventListener("click", (e) => {
	breathFirstSearch();
});

function handleHighlightBtn(btnToHighlight) {
	//Remove all Highlights
	setStartBtn.classList.remove("brushBtnSelected");
	setEndBtn.classList.remove("brushBtnSelected");
	activeBrushSelector.classList.remove("brushSwitchSelected");
	activeBrushSelector.classList.remove("brushSwitchSelectedToggled");

	//Start/End Button
	if (btnToHighlight == setEndBtn || btnToHighlight == setStartBtn) {
		btnToHighlight.classList.add("brushBtnSelected");
	} else {
		//Switch Button
		activeBrushSelector.classList.add("brushSwitchSelected");

		if (btnToHighlight == eraseBtn) {
			activeBrushSelector.classList.add("brushSwitchSelectedToggled");
		}
	}
}

//============== Cell Size ==============//

cellSizeSlider.addEventListener("input", function () {
	debugText.innerHTML = this.value;
	const size = POSSIBLECELLSIZES[this.value];
	gridManager.initArray(720 / size, 360 / size);

	gridRenderer.setCellSize(size);
	gridRenderer.renderGrid();
});
