import { renderGrid } from "./gridRenderer.js";
//Init Array
var gridWalls;
var X;
var Y;
var start;
var end;

function initArray(x, y) {
	//Set size
	X = x;
	Y = y;

	//Generate and fill array
	gridWalls = new Array(x);
	for (var i = 0; i < gridWalls.length; i++) gridWalls[i] = new Array(y);

	//Set start/end
	start = [0, 0];
	gridWalls[0][0] = "S";
	end = [x - 1, y - 1];
	gridWalls[x - 1][y - 1] = "E";

	fillArray(0);
}

function fillArray(value) {
	for (let i = 0; i < X; i++) {
		for (let j = 0; j < Y; j++) {
			gridWalls[i][j] = value;
		}
	}

	gridWalls[start[0]][start[1]] = "S";
	gridWalls[end[0]][end[1]] = "E";
}

function resetRunningValues() {
	for (let i = 0; i < X; i++) {
		for (let j = 0; j < Y; j++) {
			if (gridWalls[i][j] !== 1) {
				gridWalls[i][j] = 0;
			}
		}
	}
	gridWalls[start[0]][start[1]] = "S";
	gridWalls[end[0]][end[1]] = "E";
	renderGrid();
}

function setWall(x, y) {
	//check if start/end cell
	if ((x == start[0] && y == start[1]) || (x == end[0] && y == end[1])) {
		return false;
	}

	gridWalls[x][y] = 1;
	return true;
}

function removeWall(x, y) {
	if ((x == start[0] && y == start[1]) || (x == end[0] && y == end[1])) {
		return false;
	}

	gridWalls[x][y] = 0;
	return true;
}

function setStart(x, y) {
	gridWalls[start[0]][start[1]] = 0;
	start = [x, y];
	gridWalls[x][y] = "S";
}

function setEnd(x, y) {
	gridWalls[end[0]][end[1]] = 0;
	end = [x, y];
	gridWalls[x][y] = "E";
}

function getCountOf(val) {
	let count = 0;

	gridWalls.forEach((element) => {
		element.forEach((i) => {
			if (i == val) count++;
		});
	});

	return count;
}

export {
	setWall,
	removeWall,
	setStart,
	setEnd,
	initArray,
	fillArray,
	resetRunningValues,
	getCountOf,
	start,
	end,
	gridWalls,
	X,
	Y,
};
