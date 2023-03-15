import { gridWalls, start, end, X, Y } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";
import { checkInBounds } from "./helperFunctions.js";
import { setStatus } from "../runControl.js";

var queue = [];
var lastCell = [];

function init() {
	//Push start into queue
	queue.push([start[0], start[1]]);
	lastCell[0] = start[0];
	lastCell[1] = start[1];
	renderGrid();
}

function doStep() {
	//set color of last cell;
	gridWalls[lastCell[0]][lastCell[1]] = "Checked";

	//get currentCell;
	const currCell = queue.shift();
	const x = currCell[0];
	const y = currCell[1];

	//Mark the cell as current;
	gridWalls[x][y] = "Current";
	console.log(gridWalls);

	//Check if End is found
	if (gridWalls[x][y] === "E") {
		console.log("Found End at" + currCell);
		setStatus("ENDFOUND");
	}

	//North
	if (checkInBounds(x, y + 1)) {
		if (gridWalls[x][y + 1] === 0) {
			queue.push([x, y + 1]);
			gridWalls[x][y + 1] = "Queued";
		}
	}

	//East
	if (checkInBounds(x + 1, y)) {
		if (gridWalls[x + 1][y] === 0) {
			queue.push([x + 1, y]);
			gridWalls[x + 1][y] = "Queued";
		}
	}

	//South
	if (checkInBounds(x, y - 1)) {
		if (gridWalls[x][y - 1] === 0) {
			queue.push([x, y - 1]);
			gridWalls[x][y - 1] = "Queued";
		}
	}

	//West
	if (checkInBounds(x - 1, y)) {
		if (gridWalls[x - 1][y] === 0) {
			queue.push([x - 1, y]);
			gridWalls[x - 1][y] = "Queued";
		}
	}

	renderGrid();

	//Update last cell
	lastCell[0] = x;
	lastCell[1] = y;
}

function reset() {
	queue = [];
	lastCell = [];
}

export { init, doStep, reset };
