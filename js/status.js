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

    pawnMoveorKill(char, oldRow, oldCol, newRow, newCol, color) {
        let layout = this.boardLayout
        let object = layout[newRow][newCol]
        let piece = object.querySelector("img")
        let Rowdiff = newRow - oldRow
        let Coldiff = newCol - oldCol


        console.log(Rowdiff + char.moved)

        if (Rowdiff == 2 && char.moved == "false" && !piece) {
            return true
        }

        if (Rowdiff == 1 && oldCol == newCol && !piece) {
            return true
        }
        if (Math.abs(Coldiff) == 1 && piece && piece.dataset.color !== color) {
            return true
        } else {
            return false
        }



    }

};
