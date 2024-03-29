import { gridWalls, start } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";
import { checkInBounds, generateArray } from "./helperFunctions.js";
import { setStatus } from "../runControl.js";

let distanceArr = [];
let calculatedRoute = [];

function initDistanceArr() {
	distanceArr = generateArray();
	distanceArr[start[0]][start[1]] = 0;
}

function setDistanceCell(x, y, value) {
	distanceArr[x][y] = value;
}

function setDistanceArr(arr) {
	distanceArr = arr;
}

let x;
let y;

function firstRouteStep(a, b) {
	x = a;
	y = b;
	calcRouteStep();
}

const calcRouteStep = function () {
	renderGrid();

	//Start found
	if (x == start[0] && y == start[1]) {
		setStatus("FINISHED");
		return [x, y];
	}

	//North
	if (checkInBounds(x, y + 1)) {
		if (distanceArr[x][y + 1] == distanceArr[x][y] - 1) {
			calculatedRoute.push([x, y + 1]);
			gridWalls[x][y + 1] = "Route";

			y++;
			return [x, y];
		}
	}

	//East
	if (checkInBounds(x + 1, y)) {
		if (distanceArr[x + 1][y] == distanceArr[x][y] - 1) {
			calculatedRoute.push([x, y + 1]);
			gridWalls[x + 1][y] = "Route";

			x++;
			return [x, y];
		}
	}

	//South
	if (checkInBounds(x, y - 1)) {
		if (distanceArr[x][y - 1] == distanceArr[x][y] - 1) {
			calculatedRoute.push([x, y - 1]);
			gridWalls[x][y - 1] = "Route";

			y--;
			return [x, y];
		}
	}

	//West
	if (checkInBounds(x - 1, y)) {
		if (distanceArr[x - 1][y] == distanceArr[x][y] - 1) {
			calculatedRoute.push([x, y + 1]);
			gridWalls[x - 1][y] = "Route";

			x--;
			return [x, y];
		}
	}
};

export {
	initDistanceArr,
	setDistanceCell,
	calcRouteStep,
	firstRouteStep,
	setDistanceArr,
	distanceArr,
};
