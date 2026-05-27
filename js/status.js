export const gameState = {
    boardLayout: [],

    besetzt(row, col, color) {
        let layout = this.boardLayout
        let object = layout[row][col]
        let piece = object.querySelector("img");
        if (piece && piece.dataset.color == color) {
            return true
        } else {

            return false
        }
    },

};
