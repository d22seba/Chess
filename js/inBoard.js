import { gameState } from "./status.js";

function placePiece(piece) {
    const layout = gameState.boardLayout
    const square = layout[piece.row][piece.col];

    const img = document.createElement("img");
    img.classList.add("char")
    img.src = piece.img;
    img.draggable = false;
    img.dataset.pieceId = piece.id;
    img.dataset.color = piece.color;
    img.dataset.type = piece.type;
    img.dataset.moved = piece.moved;
    square.appendChild(img);
}

export function placeAllPieces(pieces) {
    for (const p of pieces) { placePiece(p) }
}



