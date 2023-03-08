import { renderGrid } from "./grid/gridRenderer.js";
import { initArray } from "./grid/gridManager.js";

initArray(800 / 25, 400 / 25);

renderGrid();
