//Init Array
var gridWalls = new Array(24);
for (var i = 0; i < gridWalls.length; i++) {
  gridWalls[i] = new Array(16);
}

//Set zeros
for (let i = 0; i < 24;i++) {
    for (let j = 0; j < 16; j++) {
        gridWalls[i][j] = 0;
    }
}

var start = [0, 0];
gridWalls[0][0] = "S";
var end = [23, 15];
gridWalls[23][15] = "E";

console.log(gridWalls);


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
    gridWalls[x][y] = "S";
}

function setEnd(x, y) {
    gridWalls[end[0]][end[1]] = 0;
    end = [x, y];
    gridWalls[x][y] = "E";
}

export { setWall, removeWall, setStart, setEnd, start, end, gridWalls};