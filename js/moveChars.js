import { getValidMoves } from "./validmoves.js";
import { gameState } from "./status.js";



const chessboard = document.getElementById("schachbrett");
let startpos = null;
let char = null;
let schatten = null;
let lastchar = null;
let offsetX = 0;
let offsetY = 0;

export function startdragFunctions() {

    chessboard.addEventListener("mousedown", mousedownAction)

}

function mousedownAction(e) {
    let object = e.target
    console.log(object)
    if (!object.closest("img") || object.dataset.color == "black") {
        e.preventDefault()
        return;
    }

    if (lastchar) {

        lastchar.classList.remove("selectedSquare");
        removeValidSpots()
    }

    startpos = e.target.closest(".square")
    char = e.target.closest(".square img")

    let charinfo = char.dataset
    let positioninfo = startpos.dataset
    let validmoves = getValidMoves(charinfo.type, parseInt(positioninfo.row), parseInt(positioninfo.col));
    console.log("moves" + validmoves)
    markValidSpots(validmoves);


    startpos.classList.add("selectedSquare")
    char.classList.add("selectedChar")

    schatten = char.cloneNode(true)
    schatten.classList.add("schatten");
    startpos.appendChild(schatten)

    offsetX = e.clientX
    offsetY = e.clientY


    document.addEventListener("mousemove", mousemoveAction);

    document.addEventListener("mouseup", mouseupAction)

    console.log(char)
    console.log(startpos)
}

function mousemoveAction(e) {
    if (!char) return;

    let x = e.clientX - offsetX
    let y = e.clientY - offsetY

    char.style.transform = `translate(${x}px, ${y}px)`;
}

function mouseupAction(e) {
    if (!char) return
    let target = document.elementFromPoint(e.clientX, e.clientY)?.closest(".square");

    char.classList.remove("selectedChar")
    char.style.transform = "";

    if (schatten && schatten.parentNode) schatten.parentNode.removeChild(schatten);
    schatten = null;


    console.log(target)
    console.log(char)

    lastchar = startpos;
    char = null
    startpos = null

}



function markValidSpots(moves) {
    if (!moves) return
    const layout = gameState.boardLayout
    moves.forEach(element => {
        const [row, col] = element
        let target = layout[row][col]
        console.log(target)
        target.classList.add("validSpot")

    });
}
function removeValidSpots() {
    const layout = gameState.boardLayout

    layout.forEach(element => {
        element.forEach(r => {
            if (r) r.classList.remove("validSpot")
        })
    })
}