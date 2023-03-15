import * as gridManager from "./gridManager.js";

const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const debugText = document.getElementById("Debug");

const WHITE = "#d2dae2";
const BLACK = "#1e272e";
const GREEN = "#05c46b";
const RED = "#ff3f34";
const DARKBLUE = "#3c40c6";
const LIGHTBLUE = "#575fcf";
const GREY = "#485460";

let cellsize = 24;
ctx.strokeStyle = WHITE;

function renderGrid() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Outline
	ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

	//Grid lines
	ctx.strokeStyle = GREY;
	for (let i = 0; i <= canvas.width; i += cellsize) {
		for (let j = 0; j <= canvas.height; j += cellsize) {
			ctx.strokeRect(i, j, cellsize, cellsize);
		}
	}

	ctx.strokeStyle = WHITE;
	for (let i = 0; i < 720 / cellsize; i++) {
		for (let j = 0; j < 360 / cellsize; j++) {
			switch (gridManager.gridWalls[i][j]) {
				case 1:
					fillCell(i, j, WHITE);
					break;

				case "S":
					fillCell(i, j, GREEN);
					break;

				case "E":
					fillCell(i, j, RED);
					break;
				case "Current":
					fillCell(i, j, DARKBLUE);
					break;
				case "Checked":
					fillCell(i, j, GREY);
					break;
				case "Queued":
					fillCell(i, j, LIGHTBLUE);
					break;

				default:
					break;
			}
		}
	}
}

function fillCell(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(cellsize * x + 1, cellsize * y + 1, cellsize - 2, cellsize - 2);
}

function setCellSize(size) {
	cellsize = size;
}

export {
	fillCell,
	renderGrid,
	WHITE,
	BLACK,
	GREEN,
	RED,
	DARKBLUE,
	LIGHTBLUE,
	cellsize,
	setCellSize,
};
