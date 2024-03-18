import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)) // using state to define the board which will need to be "remembered"
  const [isXNext, setIsXNext] =  useState(true); //using state to define who's turn it is: X or O
  const [moves, setMoves] = useState(0);
  const [gameId, setGameId] = useState(null); //keeps track of the game id in the db

  useEffect(() => {
    resetGame();
  }, [])

  const handleClick = async (index) => {
    const newBoard = [...board] //this effectively copies the board to this variable
    if (newBoard[index] || winner) return; //If the space has already been filled or the winner is decided return early
    newBoard[index] = isXNext ? 'X' : 'O';  // deciding who's move it is based on the isXNext variable and filling in the board accoringly
    
    // NOTE: React gives you these functions for free
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setMoves(prevMoves => prevMoves + 1); //this is functionally the better way to update the previous value.

    if(typeof gameId !== 'undefined' || gameId !== null) {
      updateBoard(newBoard);
    }
   };

  // This updates the board in the DB.
  const updateBoard = async (newBoard) => {
    try {
      await axios.put(`${apiUrl}/games/${gameId}`, {
        position: newBoard,
        turn: isXNext ? 'O' : 'X',
        winner: calculateWinner(newBoard)
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  //This particular cell is responsible for rendering the individual cell
  const renderCell = (index) => {
    // Below we are dynamically changing the cells borders based on its position
    // We don't add a top border for the 0, 1, 2 cells or a left border for the 0, 3, 6 cells
    return (
      <button
        key={index} 
        className={
        `w-24 h-24 bg-white font-bold text-xl text-gray-800 hover:bg-gray-100 
        ${index !== 0 && index !== 1 && index !== 2 ? 'border-t-2': ''} 
        ${index !== 0 && index !== 3 && index !== 6 ? 'border-l-2': ''}
        border-gray-400`} onClick={() => handleClick(index)
        }>
        
        {board[index]}
      </button>
    )
  }

  const winner = calculateWinner(board); //given the board layout, we can calculate the winner
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`; 
  

  const resetGame = async () => {
        try {
          const response = await axios.post(`${apiUrl}/games`);
          setBoard(Array(9).fill(null));
          setIsXNext(true);
          setMoves(0);
          setGameId(prevGameId => response.data.game.id);
        } catch (error) {
          console.log("Error creating a new game:", error);
        }
  };


function calculateWinner(board) {
  const winningPossibilities = [
    [0, 1, 2], //These represent the three possibilities of winning horizontally
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8], //These represent the two possibilities of winning diagonally
    [2, 4, 6], 
    [0, 3, 6], //These represent the three possibilities of winning vertically
    [1, 4, 7],
    [2, 5, 8]
  ]

  for (let i = 0; i < winningPossibilities.length; i++){
    const [a, b, c] = winningPossibilities[i];
    
    if (board[a] && board[a] === board[b] && board[b] === board[c]){ //Do all three values along one of the winning possibilities align?
      return board[a];
    }
  };
  return null; //if none of these possibilites are found then there is no winner
};

// This is where the main board gets rendered.
  // Using the map function, we turn every cell into its own react component using the render cell functionality
  return (
    <div className="flex flex-col items-center justify-start p-4 flex-grow overflow-y-auto">
      <div className='flex flex-col items-center justify-center h-screen border border-grey-200'>
        <div className='text-2xl font-semibold mb-4'> {status}</div> {/* Adjust the margin-bottom */}
          {winner && <button onClick={resetGame}> Start New Game </button>}
          {moves >= 9 && !winner && <button onClick={resetGame}> Start New Game </button>}
        <div className='grid grid-cols-3 gap-0 rounded-lg overflow-hidden border-2 border-gray-400'> {/* Add a negative margin-top */}
          {board.map((_, index) => renderCell(index))} 
        </div>
      </div>
    </div>


  );
};

export default TicTacToe;