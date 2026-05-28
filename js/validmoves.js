import { gameState } from "./status.js";

export function getValidMoves(char, row, col) {


    let chartype = char.type

    const layout = gameState.boardLayout;

    const conf = ABILITIES[chartype]
    let moves = []

    const dirs = conf.dirs
    const sliding = conf.sliding
    if (chartype == "pawn") {

        const pawnMoves = conf.moves

        pawnMoves.forEach(element => {
            const [dr, dc] = element.dir
            console.log(element.dir)
            console.log("row = " + row + "dr = " + dr)
            let newRow = row + dr
            let newCol = col + dc
            console.log(newRow)


            if (newRow <= 7 && newRow >= 0 && newCol >= 0 && newCol <= 7 && gameState.pawnMoveorKill(char, row, col, newRow, newCol, "white")) {

                moves.push([newRow, newCol])
                console.log(newRow, newCol)

            }
        })


        return moves


    } else {


        dirs.forEach(element => {
            const [dr, dc] = element
            let newRow = row + dr
            let newCol = col + dc
            if (sliding) {

                let wasEnemy = false
                while (newRow <= 7 && newRow >= 0 && newCol >= 0 && newCol <= 7 && !gameState.besetzt(newRow, newCol, "white") && !wasEnemy) {

                    if (gameState.wasthereEnemy(newRow, newCol, "white")) {
                        wasEnemy = true
                    }
                    moves.push([newRow, newCol])
                    newRow += dr
                    newCol += dc
                }
                wasEnemy = false
            } else {


                if (newRow <= 7 && newRow >= 0 && newCol >= 0 && newCol <= 7 && !gameState.besetzt(newRow, newCol, "white")) {

                    moves.push([newRow, newCol])

                }
            }
        });
        return moves
    }


}

const ABILITIES = {
    pawn: {
        name: "pawn",
        moves: [
            { dir: [2, 0], capture: false, firstmove: true },
            { dir: [1, 0], capture: false },
            { dir: [1, 1], capture: true },
            { dir: [1, -1], capture: true }
        ],
        float: false,
        special: "promote"

    },
    rook: {
        name: "rook",
        dirs: [[1, 0], [-1, 0], [0, 1], [0, -1]],
        sliding: true
    },

    knight: {
        name: "knight",
        dirs: [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]],
        sliding: false

    },

    bishop: {
        name: "bishop",
        dirs: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
        sliding: true
    },

    queen: {
        name: "queen",
        dirs: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
        sliding: true
    },

    king: {
        name: "king",
        dirs: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
        sliding: false,
    }
}
