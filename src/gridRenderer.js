const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let mousePos = { x: 0, y: 0 };

ctx.strokeStyle = "#d2dae2";


renderGrid();


function fillCell(x, y) {
    ctx.fillStyle = "#d2dae2";
    ctx.fillRect(25 * x+1, 25 * y+1, 23, 23);
}


function renderGrid() {
    //Outline
    ctx.strokeRect(1,1,canvas.width-2,canvas.height-2);

    //Cells
    for (let i = 0; i <= canvas.width; i += 25){
        for (let j = 0; j <= canvas.height; j += 25){
            ctx.strokeRect(i, j, 25, 25);
        }
    }
}




canvas.addEventListener("mousemove", (e) => {
    //button pressed?
    if (e.buttons !== 1) return;
    draw(e);
})

canvas.addEventListener("mousedown", draw)


function draw(e) {
    //get position
    mousePos.x = e.x - canvas.getBoundingClientRect().left;
    mousePos.y = e.y - canvas.getBoundingClientRect().top;

    let cell = {
        x: Math.floor(mousePos.x / 25),
        y: Math.floor(mousePos.y / 25)
    }
    console.log(cell);
    fillCell(cell.x, cell.y);
}