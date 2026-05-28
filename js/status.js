export const gameState = {
    boardLayout: [],




    currentTurn: "white",

    switchTurn() {

        this.currentTurn = (this.currentTurn === "white") ? "black" : "white";

    },

    checkforPieces() {
        let whitePieces = []
        let blackPieces = []

        this.boardLayout.forEach(square => {
            square.forEach(col => {
                let image = col.querySelector("img")
                if (!image) return
                let farbe = image.dataset.color
                if (farbe == "black") {
                    blackPieces.push(image.dataset.type)
                } else {
                    whitePieces.push(image.dataset.type)
                }
            })
        })
        if (!blackPieces.includes("king")) {
            alert("weiß hat die Partie gewonnen")
        }
        if (!whitePieces.includes("king")) {
            alert("schwarz hat die Partie gewonnen")
        }

    },









    wasthereEnemy(row, col, color) {
        let layout = this.boardLayout
        let object = layout[row][col]
        let piece = object.querySelector("img");
        if (piece && piece.dataset.color !== color) {
            return true
        }

    },

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

        if ((Rowdiff == 2 || Rowdiff == -2) && char.moved == "false" && !piece) {
            return true
        }

        if ((Rowdiff == 1 || Rowdiff == -1) && oldCol == newCol && !piece) {
            return true
        }
        if (Math.abs(Coldiff) == 1 && piece && piece.dataset.color !== color) {
            return true
        } else {
            return false
        }



    }

};
