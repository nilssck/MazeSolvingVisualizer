import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";
import { generateMaze } from "./algorithms/randomizedDFGenerator.js";

const generateMazeBtn = document.getElementById("generateMazeBtn");

initArray(800 / 25, 400 / 25);
renderGrid();

generateMazeBtn.addEventListener("click", (e) => {
	generateMaze();
});
