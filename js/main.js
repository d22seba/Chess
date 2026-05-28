import { generateBoard, generatePiece } from "./genboard.js";
import * as inBoard from "./inBoard.js";
import * as moveChars from "./moveChars.js"
import { gameState } from "./status.js";

function drawGame() {
    const boardlayout = generateBoard();
    gameState.boardLayout = boardlayout;

    const pieces = [
        generatePiece("bR1", "rook", "black", 7, 0),
        generatePiece("bN1", "knight", "black", 7, 1),
        generatePiece("bB1", "bishop", "black", 7, 2),
        generatePiece("bQ", "queen", "black", 7, 3),
        generatePiece("bK", "king", "black", 7, 4),
        generatePiece("bB2", "bishop", "black", 7, 5),
        generatePiece("bN2", "knight", "black", 7, 6),
        generatePiece("bR2", "rook", "black", 7, 7),

        generatePiece("bP1", "pawn", "black", 6, 0),
        generatePiece("bP2", "pawn", "black", 6, 1),
        generatePiece("bP3", "pawn", "black", 6, 2),
        generatePiece("bP4", "pawn", "black", 6, 3),
        generatePiece("bP5", "pawn", "black", 6, 4),
        generatePiece("bP7", "pawn", "black", 6, 5),
        generatePiece("bP7", "pawn", "black", 6, 6),
        generatePiece("bP8", "pawn", "black", 6, 7),

        generatePiece("wP1", "pawn", "white", 1, 0),
        generatePiece("wP2", "pawn", "white", 1, 1),
        generatePiece("wP3", "pawn", "white", 1, 2),
        generatePiece("wP4", "pawn", "white", 1, 3),
        generatePiece("wP5", "pawn", "white", 1, 4),
        generatePiece("wP7", "pawn", "white", 1, 5),
        generatePiece("wP7", "pawn", "white", 1, 6),
        generatePiece("wP8", "pawn", "white", 1, 7),

        generatePiece("wR1", "rook", "white", 0, 0),
        generatePiece("wN1", "knight", "white", 0, 1),
        generatePiece("wB1", "bishop", "white", 0, 2),
        generatePiece("wQ", "queen", "white", 0, 3),
        generatePiece("wK", "king", "white", 0, 4),
        generatePiece("wB2", "bishop", "white", 0, 5),
        generatePiece("wN2", "knight", "white", 0, 6),
        generatePiece("wR2", "rook", "white", 0, 7),
    ];

    inBoard.placeAllPieces(pieces)
    gameState.checkforPieces()
}

function startGame() {
    drawGame();
    moveChars.startdragFunctions();
}

startGame()



