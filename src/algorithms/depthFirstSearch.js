import { gridWalls, start, end } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";
import { checkInBounds } from "./helperFunctions.js";
import { setStatus } from "../runControl.js";
import * as routeGen from "./routegenerator.js";

var stack = [];
var lastCell = [];

const init = function () {
	//Push start into queue
	stack.push([start[0], start[1]]);
	lastCell[0] = start[0];
	lastCell[1] = start[1];

	routeGen.initDistanceArr();

	renderGrid();
};

const doStep = function () {
	//set color of last cell;
	gridWalls[lastCell[0]][lastCell[1]] = "Checked";

	//stack emtpy, end not found
	if (stack.length == 0) {
		setStatus("FINISHED");
		return start;
	}

	//get currentCell;
	const currCell = stack.pop();
	const x = currCell[0];
	const y = currCell[1];

	//Mark the cell as current;
	gridWalls[x][y] = "Current";

	//Check if End is found
	if (x == end[0] && y == end[1]) {
		console.warn("Found End at " + currCell);
		setStatus("DRAWINGROUTE");
		routeGen.firstRouteStep(x, y);
		return [x, y];
	}

	//East
	if (checkInBounds(x + 1, y)) {
		if (gridWalls[x + 1][y] === 0 || gridWalls[x + 1][y] === "E") {
			stack.push([x + 1, y]);
			gridWalls[x + 1][y] = "Queued";

			routeGen.setDistanceCell(x + 1, y, routeGen.distanceArr[x][y] + 1);
		}
	}

	//South
	if (checkInBounds(x, y - 1)) {
		if (gridWalls[x][y - 1] === 0 || gridWalls[x][y - 1] === "E") {
			stack.push([x, y - 1]);
			gridWalls[x][y - 1] = "Queued";

			routeGen.setDistanceCell(x, y - 1, routeGen.distanceArr[x][y] + 1);
		}
	}

	//West
	if (checkInBounds(x - 1, y)) {
		if (gridWalls[x - 1][y] === 0 || gridWalls[x - 1][y] === "E") {
			stack.push([x - 1, y]);
			gridWalls[x - 1][y] = "Queued";

			routeGen.setDistanceCell(x - 1, y, routeGen.distanceArr[x][y] + 1);
		}
	}

	//North
	if (checkInBounds(x, y + 1)) {
		if (gridWalls[x][y + 1] === 0 || gridWalls[x][y + 1] === "E") {
			stack.push([x, y + 1]);
			gridWalls[x][y + 1] = "Queued";

			routeGen.setDistanceCell(x, y + 1, routeGen.distanceArr[x][y] + 1);
		}
	}

	renderGrid();

	//Update last cell
	lastCell[0] = x;
	lastCell[1] = y;

	return [x, y];
};

const reset = function reset() {
	stack = [];
	lastCell = [];
};

export { init, doStep, reset };
