import { gridWalls, start, end } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";
import { checkInBounds } from "./helperFunctions.js";
import { setStatus } from "../runControl.js";
import * as routeGen from "./routegenerator.js";

var lastCell = [];
var nextCell = [];
var x;
var y;
var currentDirection = "North";

const init = function () {
	//Push start into queue
	nextCell[0] = start[0];
	nextCell[1] = start[1];
	lastCell[0] = start[0];
	lastCell[1] = start[1];
	routeGen.initDistanceArr();

	renderGrid();
};

const doStep = function () {
	//set color of last cell;
	gridWalls[lastCell[0]][lastCell[1]] = "Checked";

	x = nextCell[0];
	y = nextCell[1];

	//Mark the cell as current;
	gridWalls[x][y] = "Current";

	//Check if End is found
	if (x == end[0] && y == end[1]) {
		setStatus("FINISHED");
	}

	if (currentDirection == "North") {
		if (tryGoEast()) {
			currentDirection = "East";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoNorth()) {
			currentDirection = "North";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}

		if (tryGoWest()) {
			currentDirection = "West";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoSouth()) {
			currentDirection = "South";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
	}

	if (currentDirection == "East") {
		if (tryGoSouth()) {
			currentDirection = "South";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoEast()) {
			currentDirection = "East";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoNorth()) {
			currentDirection = "North";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoWest()) {
			currentDirection = "West";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
	}

	if (currentDirection == "South") {
		if (tryGoWest()) {
			currentDirection = "West";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoSouth()) {
			currentDirection = "South";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoEast()) {
			currentDirection = "East";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoNorth()) {
			currentDirection = "North";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
	}

	if (currentDirection == "West") {
		if (tryGoNorth()) {
			currentDirection = "North";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoWest()) {
			currentDirection = "West";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoSouth()) {
			currentDirection = "South";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
		if (tryGoEast()) {
			currentDirection = "East";
			renderGrid();
			lastCell[0] = x;
			lastCell[1] = y;
			return [x, y];
		}
	}

	renderGrid();
	lastCell[0] = x;
	lastCell[1] = y;
	return [x, y];
};

function tryGoNorth() {
	if (checkInBounds(x, y + 1)) {
		if (
			gridWalls[x][y + 1] === 0 ||
			gridWalls[x][y + 1] === "E" ||
			gridWalls[x][y + 1] === "Checked"
		) {
			nextCell = [x, y + 1];
			return true;
		}
	}

	return false;
}

function tryGoEast() {
	if (checkInBounds(x + 1, y)) {
		if (
			gridWalls[x + 1][y] === 0 ||
			gridWalls[x + 1][y] === "E" ||
			gridWalls[x + 1][y] === "Checked"
		) {
			nextCell = [x + 1, y];
			return true;
		}
	}

	return false;
}

function tryGoSouth() {
	if (checkInBounds(x, y - 1)) {
		if (
			gridWalls[x][y - 1] === 0 ||
			gridWalls[x][y - 1] === "E" ||
			gridWalls[x][y - 1] === "Checked"
		) {
			nextCell = [x, y - 1];
			return true;
		}
	}

	return false;
}

function tryGoWest() {
	if (checkInBounds(x - 1, y)) {
		if (
			gridWalls[x - 1][y] === 0 ||
			gridWalls[x - 1][y] === "E" ||
			gridWalls[x - 1][y] === "Checked"
		) {
			nextCell = [x - 1, y];
			return true;
		}
	}

	return false;
}

const reset = function () {
	lastCell = [];
	nextCell = [];
	currentDirection = "North";
};

export { init, doStep, reset };
