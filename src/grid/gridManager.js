//Init Array
var gridWalls;
var X;
var Y;
var start;
var end;

function initArray(x, y) {
	X = x;
	Y = y;
	gridWalls = new Array(x);
	for (var i = 0; i < gridWalls.length; i++) gridWalls[i] = new Array(y);

	fillArray(0);

	start = [0, 0];
	gridWalls[0][0] = "S";
	end = [x - 1, y - 1];
	gridWalls[x - 1][y - 1] = "E";
}

function fillArray(value) {
	for (let i = 0; i < X; i++) {
		for (let j = 0; j < Y; j++) {
			gridWalls[i][j] = value;
		}
	}
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
	console.log("Set start to " + start);
	gridWalls[x][y] = "S";
}

function setEnd(x, y) {
	gridWalls[end[0]][end[1]] = 0;
	end = [x, y];
	gridWalls[x][y] = "E";
}

export {
	setWall,
	removeWall,
	setStart,
	setEnd,
	initArray,
	fillArray,
	start,
	end,
	gridWalls,
	X,
	Y,
};