import * as grid from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";

function isVisited(x, y) {
	let result = false;
	visited.forEach((element) => {
		if (element[0] == x && element[1] == y) {
			result = true;
		}
	});

	return result;
}

function getNeighbours(x, y) {
	let neighbours = [];
	console.log(grid.X / 2);

	if (x + 1 < grid.X / 2 - 1 && !isVisited(x + 1, y))
		neighbours.push([x + 1, y]);

	if (x - 1 >= 0 && !isVisited(x - 1, y)) neighbours.push([x - 1, y]);

	if (y + 1 < grid.Y / 2 - 1 && !isVisited(x, y + 1))
		neighbours.push([x, y + 1]);

	if (y - 1 >= 0 && !isVisited(x, y - 1)) neighbours.push([x, y - 1]);

	return neighbours;
}

let visited = [];
let stack = [];

function generateMaze() {
	visited = [];
	stack = [];
	grid.fillArray(1);
	generate([0, 0]);
}

async function generate(currentCell) {
	//Mark the current cell as visited
	grid.removeWall(2 * currentCell[0] + 1, 2 * currentCell[1] + 1);
	visited.push(currentCell);
	stack.push(currentCell);

	while (stack.length != 0) {
		console.log(stack);
		//Pop a cell from the stack and make it a current cell
		currentCell = stack.pop();
		grid.removeWall(2 * currentCell[0] + 1, 2 * currentCell[1] + 1);

		//If the current cell has any neighbours which have not been visited
		var neighbours = getNeighbours(currentCell[0], currentCell[1]);
		console.log("N:", neighbours);

		if (neighbours.length != 0) {
			//Push the current cell to the stack
			stack.push(currentCell);

			//Choose one of the unvisited neighbours
			let chosenIndex = Math.floor(Math.random() * neighbours.length);
			let chosenCell = neighbours[chosenIndex];

			//Remove the wall between the current cell and the chosen cell
			if (currentCell[1] == chosenCell[1]) {
				if (currentCell[0] < chosenCell[0]) {
					grid.removeWall(2 * (currentCell[0] + 1), 2 * currentCell[1] + 1);
				} else {
					grid.removeWall(2 * currentCell[0], 2 * currentCell[1] + 1);
				}
			} else {
				if (currentCell[1] < chosenCell[1]) {
					grid.removeWall(2 * currentCell[0] + 1, 2 * (currentCell[1] + 1));
				} else {
					grid.removeWall(2 * currentCell[0] + 1, 2 * currentCell[1]);
				}
			}

			//Mark the chosen cell as visited and push it to the stack
			visited.push(chosenCell);
			stack.push(chosenCell);

			renderGrid();
			await new Promise((r) => setTimeout(r, 1));
		}
	}
}

export { generateMaze };