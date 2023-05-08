import * as grid from "../grid/gridManager.js";

function checkInBounds(x, y) {
	if (x < 0 || y < 0 || x > grid.X - 1 || y > grid.Y - 1) {
		return false;
	}
	return true;
}

function generateArray(value = 100000000) {
	let arr = new Array(grid.X);

	for (var i = 0; i < arr.length; i++) arr[i] = new Array(grid.Y);

	for (let i = 0; i < grid.X; i++) {
		for (let j = 0; j < grid.Y; j++) {
			arr[i][j] = value;
		}
	}

	return arr;
}

function getFCost(nodeArray) {
	var arr = new Array(grid.X);
	for (var i = 0; i < arr.length; i++) arr[i] = new Array(grid.Y);
	for (let i = 0; i < grid.X; i++) {
		for (let j = 0; j < grid.Y; j++) {
			arr[i][j] = Math.round(nodeArray[i][j].gCost * 100) / 100;
		}
	}
	console.table(arr);
	return arr;
}

export { checkInBounds, generateArray, getFCost };
