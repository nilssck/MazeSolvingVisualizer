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


console.info(gridWalls);