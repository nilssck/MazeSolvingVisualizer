import * as gridManager from "./gridManager.js"
import { breathFirstSearch } from "./algorithms/breathFirstSearch.js";

const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


const brushBtn = document.getElementById("brushBtn");
const eraseBtn = document.getElementById("eraseBtn");
const setStartBtn = document.getElementById("setStartBtn");
const setEndBtn = document.getElementById("setEndBtn");
const activeBrushSelector = document.getElementById("activeBrushSelector");
const startBtn = document.getElementById("runBtn");
const debugText = document.getElementById("Debug");

const WHITE = "#d2dae2";
const BLACK = "#1e272e";
const GREEN = "#05c46b";
const RED = "#ff3f34";
const DARKBLUE = "#3c40c6";
const LIGHTBLUE = "#575fcf";

let drawMode = "Draw";
let cellsize = 80;
ctx.strokeStyle = WHITE;


function renderGrid() {

    //Correct Cellsize, so no half cells are drawn
    while (canvas.height % cellsize != 0) {
        cellsize--;
    }

    //Outline
    ctx.strokeRect(1,1,canvas.width-2,canvas.height-2);

    //Cells
    for (let i = 0; i <= canvas.width; i += cellsize){
        for (let j = 0; j <= canvas.height; j += cellsize){
            ctx.strokeRect(i, j, cellsize, cellsize);
        }
    }

    for (let i = 0; i < 24;i++) {
        for (let j = 0; j < 16; j++) {
            switch (gridManager.gridWalls[i][j]) {
                case 1:
                    fillCell(i,j,WHITE)
                    break;
                
                case "S":
                    fillCell(i, j, GREEN)
                    break;
                    
                case "E":
                    fillCell(i, j, RED)
                    break;
                case "M":
                    fillCell(i, j, DARKBLUE);
                    break;
                case "F":
                    fillCell(i, j, LIGHTBLUE);

                default:
                    break;
            }
            
        }
    }
}
renderGrid();


function fillCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(cellsize * x+1, cellsize * y+1, cellsize-2, cellsize-2);
}




//============== Grid Drawing ==============//

canvas.addEventListener("mousemove", (e) => {
    //button pressed?
    if (e.buttons !== 1) return;
    draw(e);
})
canvas.addEventListener("mousedown", draw);

function draw(e) {
    let mousePos = {};
    //get position
    mousePos.x = e.x - canvas.getBoundingClientRect().left;
    mousePos.y = e.y - canvas.getBoundingClientRect().top;


    //get cell
    let cell = {
        x: Math.floor(mousePos.x / cellsize),
        y: Math.floor(mousePos.y / cellsize)
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

startBtn.addEventListener("click", (e) => {
    breathFirstSearch();
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


export { renderGrid };