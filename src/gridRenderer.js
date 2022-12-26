import * as gridManager from "./gridManager.js"

const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


const brushBtn = document.getElementById("brushBtn");
const eraseBtn = document.getElementById("eraseBtn");
const setStartBtn = document.getElementById("setStartBtn");
const setEndBtn = document.getElementById("setEndBtn");
const activeBrushSelector = document.getElementById("activeBrushSelector")
const debugText = document.getElementById("Debug")

let drawMode = "Draw";
let mousePos = { x: 0, y: 0 };
ctx.strokeStyle = "#d2dae2";


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
renderGrid();




//Draw functionality
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

    //get cell
    let cell = {
        x: Math.floor(mousePos.x / 25),
        y: Math.floor(mousePos.y / 25)
    }

    //draw or erase
    if (drawMode == "Draw") {
        fillCell(cell.x, cell.y, "#d2dae2");
        gridManager.setWall(cell.x, cell.y)
    }
    else if (drawMode == "Erase") {
        fillCell(cell.x, cell.y, "#1e272e");
        gridManager.removeWall(cell.x, cell.y) 
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

