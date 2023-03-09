import { gridWalls, start, end } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";

var queue = [];

function checkInBounds(x, y) {
	if (x < 0 || y < 0 || x > 23 || y > 15) {
		return false;
	}
	console.log(x + " " + y + " in bounds");
	return true;
}

async function breathFirstSearch() {
	queue.push([start[0], start[1]]);

	while (queue.length > 0) {
		let currCell = queue.shift();
		let x = currCell[0];
		let y = currCell[1];

		gridWalls[x][y] = "F";

		if (checkInBounds(x, y + 1)) {
			if (gridWalls[x][y + 1] === "E") {
				console.log("Found End at" + currCell);
				break;
			}

			if (gridWalls[x][y + 1] === 0) {
				queue.push([x, y + 1]);
				gridWalls[x][y + 1] = "M";
			}
		}

		if (checkInBounds(x + 1, y)) {
			if (gridWalls[x + 1][y] === "E") {
				console.log("Found End at" + currCell);
				break;
			}
			if (gridWalls[x + 1][y] === 0) {
				queue.push([x + 1, y]);
				gridWalls[x + 1][y] = "M";
			}
		}

		if (checkInBounds(x, y - 1)) {
			if (gridWalls[x][y - 1] === "E") {
				console.log("Found End at" + currCell);
				break;
			}
			if (gridWalls[x][y - 1] === 0) {
				queue.push([x, y - 1]);
				gridWalls[x][y - 1] = "M";
			}
		}

		if (checkInBounds(x - 1, y)) {
			if (gridWalls[x - 1][y] === "E") {
				console.log("Found End at" + currCell);
				break;
			}

			if (gridWalls[x - 1][y] === 0) {
				queue.push([x - 1, y]);
				gridWalls[x - 1][y] = "M";
			}
		}

		renderGrid();
		console.log(queue);

		await new Promise((r) => setTimeout(r, 10));
	}
}

export { breathFirstSearch };
