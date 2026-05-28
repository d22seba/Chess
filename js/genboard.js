export function generateBoard() {
    const chessboard = document.getElementById("schachbrett");
    if (chessboard) chessboard.innerHTML = "";
    const layout = [];

    for (let i = 0; i < 64; i++) {

        const square = document.createElement("div");
        square.draggable = false;
        square.classList.add("square");
        console.log(i);

        const row = 7 - (Math.floor(i / 8));
        const col = i % 8;
        square.classList.add((row + col) % 2 === 0 ? "white" : "black");
        square.dataset.row = row;
        square.dataset.col = col;

        chessboard.appendChild(square)

        if (!layout[row]) layout[row] = [];
        layout[row][col] = square;

    }
    return layout;
}

export function generatePiece(id, type, color, row, col) {
    return {
        id,
        type,
        color,
        row,
        col,
        moved: false,
        img: `./assets/${color}-${type}.png`
    };
}
