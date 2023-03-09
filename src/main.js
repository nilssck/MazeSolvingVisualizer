import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");

initArray(720 / 20, 360 / 20);
renderGrid();

generateMazeBtn.addEventListener("click", (e) => {
	generateMaze();
});

[
	1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90,
	120, 180,
];
