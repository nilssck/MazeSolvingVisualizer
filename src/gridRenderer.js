import * as gridManager from "./gridManager.js"

const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


const brushBtn = document.getElementById("brushBtn");
const eraseBtn = document.getElementById("eraseBtn");
const setStartBtn = document.getElementById("setStartBtn");
const setEndBtn = document.getElementById("setEndBtn");
const activeBrushSelector = document.getElementById("activeBrushSelector")
const debugText = document.getElementById("Debug");

const WHITE = "#d2dae2";
const BLACK = "#1e272e";
const GREEN = "#05c46b";
const RED = "#ff3f34";

let drawMode = "Draw";
let mousePos = { x: 0, y: 0 };
ctx.strokeStyle = WHITE;


function renderGrid() {
    //Outline
    ctx.strokeRect(1,1,canvas.width-2,canvas.height-2);

    //Cells
    for (let i = 0; i <= canvas.width; i += 25){
        for (let j = 0; j <= canvas.height; j += 25){
            ctx.strokeRect(i, j, 25, 25);
        }
    }

    for (let i = 0; i < 24;i++) {
        for (let j = 0; j < 16; j++) {
            switch (gridManager.gridWalls[i][j]) {
                case 1:
                    fillCell(i,j,WHITE)
                    break;
                
                case "S":
                    console.log("Filling green");
                    fillCell(i, j, GREEN)
                    break;
                    
                case "E":
                    console.log("Filling RED");

                    fillCell(i,j, RED)
                default:
                    break;
            }
            
        }
    }
}
renderGrid();




//============== Grid Drawing ==============//

canvas.addEventListener("mousemove", (e) => {
    //button pressed?
    if (e.buttons !== 1) return;
    draw(e);
})
canvas.addEventListener("mousedown", draw);

function draw(e) {
    //get position
    mousePos.x = e.x - canvas.getBoundingClientRect().left;
    mousePos.y = e.y - canvas.getBoundingClientRect().top;


    //get cell
    let cell = {
        x: Math.floor(mousePos.x / 25),
        y: Math.floor(mousePos.y / 25)
    }

    switch (drawMode) {
        case "Draw":
            if (gridManager.setWall(cell.x, cell.y)) {
                fillCell(cell.x, cell.y, WHITE);   
            }
            break;
        
        case "Erase":
            if (gridManager.removeWall(cell.x, cell.y)) {
                fillCell(cell.x, cell.y, BLACK);
            } 
            break;
        
        case "Start":
            fillCell(gridManager.start[0],gridManager.start[1], BLACK)
            fillCell(cell.x, cell.y, GREEN);

            gridManager.setStart(cell.x, cell.y);

            //Reset
            handleHighlightBtn(brushBtn);
            drawMode = "Draw";
            break;
        
        case "End":
            fillCell(gridManager.end[0],gridManager.end[1], BLACK)
            fillCell(cell.x, cell.y, RED);
            gridManager.setEnd(cell.x, cell.y);

            //Reset
            handleHighlightBtn(brushBtn);
            drawMode = "Draw";
            break;
    
        default:
            break;
    }

}


function fillCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(25 * x+1, 25 * y+1, 23, 23);
}


//============== Brush Buttons ==============//
brushBtn.addEventListener("click", (e) => {
    drawMode = "Draw";
    handleHighlightBtn(brushBtn);
})

eraseBtn.addEventListener("click", (e) => {
    drawMode = "Erase";
    handleHighlightBtn(eraseBtn);
})

setStartBtn.addEventListener("click", (e) => {
    drawMode = "Start";
    handleHighlightBtn(setStartBtn);
})

setEndBtn.addEventListener("click", (e) => {
    drawMode = "End";
    handleHighlightBtn(setEndBtn);

})



function handleHighlightBtn(btnToHighlight) {
    //Remove all Highlights
    setStartBtn.classList.remove("brushBtnSelected");
    setEndBtn.classList.remove("brushBtnSelected");
    activeBrushSelector.classList.remove("brushSwitchSelected");
    activeBrushSelector.classList.remove("brushSwitchSelectedToggled")

    //Start/End Button
    if (btnToHighlight == setEndBtn || btnToHighlight == setStartBtn ){
        btnToHighlight.classList.add("brushBtnSelected");
    }
    else { //Switch Button
        activeBrushSelector.classList.add("brushSwitchSelected")

        if (btnToHighlight == eraseBtn) {
            activeBrushSelector.classList.add("brushSwitchSelectedToggled")
        }
    }
}

