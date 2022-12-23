console.log("HelloWorld");

/** @type {Canvas} */
const grid = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = grid.getContext("2d");

ctx.strokeStyle = "#d2dae2";





function drawGrid() {
    ctx.strokeRect(1,1,grid.width-2,grid.height-2);

    for (let i = 0; i <= grid.width; i += 25){
        for (let j = 0; j <= grid.height; j += 25){
            ctx.strokeRect(i, j, 25, 25);
        }
    }
}