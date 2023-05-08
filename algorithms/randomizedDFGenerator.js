import * as grid from "../grid/gridManager.js";
import { cellsize, renderGrid } from "../grid/gridRenderer.js";
import { setStatus } from "../runControl.js";

const cellSizeSlider = document.getElementById("cellSizeSlider");
const clearBtn = document.getElementById("clearBtn");

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

	//North
	if (x + 1 < grid.X / 2 - 1 && !isVisited(x + 1, y))
		neighbours.push([x + 1, y]);

	//South
	if (x - 1 >= 0 && !isVisited(x - 1, y)) neighbours.push([x - 1, y]);

	//East
	if (y + 1 < grid.Y / 2 - 1 && !isVisited(x, y + 1))
		neighbours.push([x, y + 1]);

	//West
	if (y - 1 >= 0 && !isVisited(x, y - 1)) neighbours.push([x, y - 1]);

	return neighbours;
}

let visited = [];
let stack = [];

function generateMaze() {
	visited = [];
	stack = [];

	//Fill with Walls

	grid.setStart(1, 1);
	grid.setEnd(grid.X - 3, grid.Y - 3);
	grid.fillArray(1);
	generate([0, 0]);
}

async function generate(currentCell) {
	//Mark the current cell as visited
	grid.removeWall(2 * currentCell[0] + 1, 2 * currentCell[1] + 1);
	visited.push(currentCell);
	stack.push(currentCell);

	while (stack.length != 0) {
		//Pop a cell from the stack and make it a current cell
		currentCell = stack.pop();
		grid.removeWall(2 * currentCell[0] + 1, 2 * currentCell[1] + 1);

		//If the current cell has any neighbours which have not been visited
		var neighbours = getNeighbours(currentCell[0], currentCell[1]);

		if (neighbours.length != 0) {
			//Push the current cell to the stack
			stack.push(currentCell);

			//Choose one of the unvisited neighbours
			let chosenIndex = Math.floor(Math.random() * neighbours.length);
			let chosenCell = neighbours[chosenIndex];

			//Remove the wall between the current cell and the chosen cell
			if (currentCell[1] == chosenCell[1]) {
				if (currentCell[0] < chosenCell[0]) {
					//North
					grid.removeWall(2 * (currentCell[0] + 1), 2 * currentCell[1] + 1);
				} else {
					//South
					grid.removeWall(2 * currentCell[0], 2 * currentCell[1] + 1);
				}
			} else {
				if (currentCell[1] < chosenCell[1]) {
					//East
					grid.removeWall(2 * currentCell[0] + 1, 2 * (currentCell[1] + 1));
				} else {
					//West
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

	setStatus("IDLE");
	cellSizeSlider.disabled = false;
	clearBtn.disabled = false;
}

export { generateMaze };
