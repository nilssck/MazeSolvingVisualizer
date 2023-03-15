import * as grid from "../grid/gridManager.js";

function checkInBounds(x, y) {
	if (x < 0 || y < 0 || x > grid.X - 1 || y > grid.Y - 1) {
		return false;
	}
	return true;
}

export { checkInBounds };
