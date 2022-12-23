console.log("HelloWorld");


const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#d2dae2";

drawGrid();
fillCell(0, 0);
fillCell(1, 1);
fillCell(1, 2);
fillCell(15, 13);



function fillCell(x, y) {
    ctx.fillStyle = "#d2dae2";
    ctx.fillRect(25 * x+1, 25 * y+1, 23, 23);
}


function drawGrid() {
    //Outline
    ctx.strokeRect(1,1,canvas.width-2,canvas.height-2);

    //Cells
    for (let i = 0; i <= canvas.width; i += 25){
        for (let j = 0; j <= canvas.height; j += 25){
            ctx.strokeRect(i, j, 25, 25);
        }
    }
}