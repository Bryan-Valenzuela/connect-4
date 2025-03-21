import {COLUMS} from '../constants.js'



export const checkWinnerFrom = (boardToCheck) => {
    //comprobamos que si se forma un ganador 
    const cols = 7 
    const rows = 6
    const winLength = 4 //cuantas fichas se necesitan para ganar
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            //las posiciones en las columnas con multiplos del total de columnas
            const index = row * cols + col 
            const player = boardToCheck[index]

            if (!player) continue //si la cellda es null pasara a la siguiente iteracion

            //verificar horizontal
            if (col <= cols - winLength && // verificamos qeu nos permita tener la longitud necesaria dentro del tablero para ganar
                player === boardToCheck[index+1] &&
                player === boardToCheck[index+2] &&
                player === boardToCheck[index+3] 
            ){
                
                return true
            }

            //verificar vertical
            if (row <= rows - winLength && 
                player === boardToCheck[index+1 * cols] &&
                player === boardToCheck[index+2 * cols] &&
                player === boardToCheck[index+3 * cols] 
            ){
                return true
            }

            //verificar diagonal \
            if (row <= rows - winLength && col <= cols - winLength &&
                player === boardToCheck[index+1 * cols + 1] &&
                player === boardToCheck[index+2 * cols + 2] &&
                player === boardToCheck[index+3 * cols + 3] 
            ){
                return true
            }

            //verificar diagonal /
            if (row <= rows - winLength && col >= cols - winLength &&
                player === boardToCheck[index+ cols - 1] &&
                player === boardToCheck[index+2 * cols - 2] &&
                player === boardToCheck[index+3 * cols - 3] 
            ){
                return true
            }


        }
    }
    

    //si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    //revisamos si hay empate y que no queden espacios libres
    return newBoard.every((square) => square !== null)
}