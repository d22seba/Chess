import { getValidMoves } from "./validmoves.js";
import { gameState } from "./status.js";



const chessboard = document.getElementById("schachbrett");
let startpos = null;
let char = null;
let schatten = null;
let lastSquare = null;
let offsetX = 0;
let offsetY = 0;

export function startdragFunctions() {

    chessboard.addEventListener("pointerdown", pointerdownAction)

}

function pointerdownAction(e) {
    let object = e.target
    if (!object.closest("img") || object.dataset.color == "black") {
        e.preventDefault()
        return;
    }

    if (lastSquare) {

        lastSquare.classList.remove("selectedSquare");
        removeValidSpots()
    }

    startpos = e.target.closest(".square")
    char = e.target.closest(".square img")

    let charinfo = char.dataset
    let positioninfo = startpos.dataset
    let validmoves = getValidMoves(charinfo, parseInt(positioninfo.row), parseInt(positioninfo.col));
    console.log("moves" + validmoves)
    markValidSpots(validmoves);


    startpos.classList.add("selectedSquare")
    char.classList.add("selectedChar")

    schatten = char.cloneNode(true)
    schatten.classList.add("schatten");
    startpos.appendChild(schatten)

    offsetX = e.clientX
    offsetY = e.clientY

    if (e.pointerType === "touch" || e.pointerType === "pen") {
        chessboard.setPointerCapture(e.pointerId)
    }


    document.addEventListener("pointermove", pointermoveAction);

    document.addEventListener("pointerup", pointerupAction)

    console.log(char)
    console.log(startpos)
}

function pointermoveAction(e) {
    if (!char) return;

    let x = e.clientX - offsetX
    let y = e.clientY - offsetY

    char.style.transform = `translate(${x}px, ${y}px)`;
}

function pointerupAction(e) {
    if (!char) return
    let target = document.elementFromPoint(e.clientX, e.clientY)?.closest(".square");
    if (target && target.classList.contains("validSpot")) {
        movedChar(target, startpos, char)
    }
    char.classList.remove("selectedChar")
    char.style.transform = "";

    if (schatten && schatten.parentNode) schatten.parentNode.removeChild(schatten);
    schatten = null;

    document.removeEventListener("pointermove", pointermoveAction);
    document.removeEventListener("pointerup", pointerupAction);


    lastSquare = target;
    char = null
    startpos = null

}

function movedChar(newpos, lastpos, char){
    newpos.innerHTML = ""
    newpos.appendChild(char)
    char.dataset.moved = "true"
    
    newpos.classList.add("selectedSquare")
    lastpos.classList.remove("selectedSquare")
        
    lastpos.innerHTML = ""

    removeValidSpots()

    let positioninfo = newpos.dataset
    let validmoves = getValidMoves(char.dataset, parseInt(positioninfo.row), parseInt(positioninfo.col));
    markValidSpots(validmoves)


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
