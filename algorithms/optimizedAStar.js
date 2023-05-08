import { gridWalls, start, end, X, Y } from "../grid/gridManager.js";
import { renderGrid } from "../grid/gridRenderer.js";
import { checkInBounds, getFCost } from "./helperFunctions.js";
import { setStatus } from "../runControl.js";
import * as routeGen from "./routegenerator.js";
import { MinHeap } from "./datastructures/MinHeap.js";

class Node {
	constructor(x, y) {
		this.gCost = 10000000; //distance from start
		this.hCost = 10000000; //manhattan distance from end
		this.fCost = this.gCost + this.hCost; // sum
		this.x = x;
		this.y = y;
	}
}

let nodeArray;
let openList = new MinHeap();
let closedList = new Set();
let currentNode;
let lastCell = [];

function init() {
	//Init node Array
	nodeArray = new Array(X);
	for (var i = 0; i < nodeArray.length; i++) nodeArray[i] = new Array(Y);
	for (let i = 0; i < X; i++) {
		for (let j = 0; j < Y; j++) {
			nodeArray[i][j] = new Node(i, j);
			nodeArray[i][j].hCost =
				getManhattanDistance([i, j], end) +
				getEucledianDistance([i, j], end) / (X + Y);
		}
	}

	//Set g cost of start node and add it to open list
	nodeArray[start[0]][start[1]].gCost = 0;
	nodeArray[start[0]][start[1]].fCost = getManhattanDistance(start, end);

	openList.add(nodeArray[start[0]][start[1]]);

	lastCell[0] = start[0];
	lastCell[1] = start[1];
}

function doStep() {
	if (openList.isempty()) {
		setStatus("FINISHED");
		return start;
	}

	currentNode = openList.remove();
	let x = currentNode.x;
	let y = currentNode.y;

	gridWalls[lastCell[0]][lastCell[1]] = "Checked";
	gridWalls[x][y] = "Current";

	if (currentNode.x == end[0] && currentNode.y == end[1]) {
		console.warn("End Found at ", currentNode);
		routeGen.setDistanceArr(getFCost(nodeArray));
		setStatus("DRAWINGROUTE");
		routeGen.firstRouteStep(x, y);
		return [x, y];
	}

	//North
	if (checkInBounds(x, y + 1)) {
		if (gridWalls[x][y + 1] != 1) {
			expand(x, y + 1);
		}
	}
	//East
	if (checkInBounds(x + 1, y)) {
		if (gridWalls[x + 1][y] != 1) {
			expand(x + 1, y);
		}
	}
	//South
	if (checkInBounds(x, y - 1)) {
		if (gridWalls[x][y - 1] != 1) {
			expand(x, y - 1);
		}
	}
	//West
	if (checkInBounds(x - 1, y)) {
		if (gridWalls[x - 1][y] != 1) {
			expand(x - 1, y);
		}
	}

	closedList.add(currentNode);

	lastCell[0] = x;
	lastCell[1] = y;

	renderGrid();

	return [x, y];
}
function reset() {
	nodeArray;
	openList = new MinHeap();
	closedList = new Set();
	currentNode;
	lastCell = [];
}

function expand(x, y) {
	// wenn der Nachfolgeknoten bereits auf der Closed List ist – tue nichts
	if (closedList.has(nodeArray[x][y])) return;

	gridWalls[x][y] = "Queued";

	// g-Wert für den neuen Weg berechnen: g-Wert des Vorgängers plus
	// die Kosten der gerade benutzten Kante
	let tentativeG =
		currentNode.gCost +
		getManhattanDistance([currentNode.x, currentNode.y], [x, y]);

	// wenn der Nachfolgeknoten bereits auf der Open List ist,
	// aber der neue Weg nicht besser ist als der alte – tue nichts
	if (openList.contains(nodeArray[x][y]) && tentativeG >= nodeArray[x][y].gCost)
		return;

	nodeArray[x][y].gCost = tentativeG;

	// f-Wert des Knotens in der Open List aktualisieren
	// bzw. Knoten mit f-Wert in die Open List einfügen

	nodeArray[x][y].fCost = tentativeG + nodeArray[x][y].hCost;

	if (openList.contains(nodeArray[x][y])) openList.heapifyUp(); //!df
	else openList.add(nodeArray[x][y]);
}

function getEucledianDistance(a, b) {
	return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

function getManhattanDistance(a, b) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export { init, doStep, reset, getEucledianDistance };
