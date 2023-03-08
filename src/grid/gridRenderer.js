import * as gridManager from "./gridManager.js"
import { breathFirstSearch } from "../algorithms/breathFirstSearch.js";

const canvas = document.getElementById("mainGrid");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


const debugText = document.getElementById("Debug");

const WHITE = "#d2dae2";
const BLACK = "#1e272e";
const GREEN = "#05c46b";
const RED = "#ff3f34";
const DARKBLUE = "#3c40c6";
const LIGHTBLUE = "#575fcf";

const POSSIBLECELLSIZES = [5, 8, 10, 16, 20, 25, 40, 50];

let drawMode = "Draw";
let cellsize = 25;
ctx.strokeStyle = WHITE;


function renderGrid() {
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


function fillCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(cellsize * x+1, cellsize * y+1, cellsize-2, cellsize-2);
}

export { fillCell, renderGrid, WHITE, BLACK, GREEN, RED, DARKBLUE, LIGHTBLUE };