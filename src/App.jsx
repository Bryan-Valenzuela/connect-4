import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './Components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './Components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/Storage.js'
import './App.css'



function App() {
  const [board, setBoard] = useState(() => {
    //verifica si hay datos guardados para usarlos si no crea un nuevo tablero 
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(42).fill(null)
  })

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.R 
  })

  // null = no ganandor, false = empate, true = ganador
  const [winner, setWinner] = useState(null)

  //reinicair el juego
  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.R)
    setWinner(null)
    resetGameStorage()
  }


  const updateBoard = (index) => {
    //no actualizara si contiene algo la cellda o si ya tenemos un ganador
    if (board[index] || winner) return

    //actualizamos el tablero 
    const newBoard = [...board]
    newBoard[index] = turn //turn es igual a 🔴 o 🟡
    setBoard(newBoard)

    //cambiamos el turno
    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)

    //guardamos la partida
    saveGameToStorage({
      board:newBoard,
      turn:newTurn
    })

    //comprobamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>4 in line</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square,index)=>{
            return(
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}>
                  {square}{index}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.R}>
          {TURNS.R}
        </Square>
        <Square isSelected={turn === TURNS.Y}>
          {TURNS.Y}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} turn={turn}/>

    </main>
  )
}


export default App
