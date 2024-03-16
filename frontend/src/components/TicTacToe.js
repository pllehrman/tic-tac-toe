import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)) // using state to define the board which will need to be "remembered"
  const [isXNext, setIsXNext] =  useState(true); //using state to define who's turn it is: X or O
  const [moves, setMoves] = useState(0);

  const handleClick = (index) => {
    const newBoard = [...board] //this effectively copies the board to this variable
    if (newBoard[index] || winner) return; //If the space has already been filled or the winner is decided return early
    let move_val;
    if (isXNext) {   // deciding who's move it is based on the isXNext variable
      move_val = 'X';
    } else {
      move_val = 'O';
    }
    newBoard[index] = move_val; //assinging the new move
    
    // NOTE: React gives you these functions for free
    setBoard(newBoard); //newBoard should be initialized with the new move
    setIsXNext(!isXNext); //next Move is reset to the opposite of what it currently is
    setMoves(moves + 1); //increment the total number of moves by one
   };
  
  //This particular cell is responsible for rendering the individual cell
  const renderCell = (index) => {
    // Below we are dynamically changing the cells borders based on its position
    // We don't add a top border for the 0, 1, 2 cells or a left border for the 0, 3, 6 cells
    return (
      <button className={
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
  

  // Resets the game board
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setMoves(0)
  }


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
    <div className='flex flex-col items-center justify-center h-screen border border-grey-200'>
      <div className='text-2xl font-semibold mb-4'> {status}</div> {/* Adjust the margin-bottom */}
        {winner && <button onClick={resetGame}> Start New Game </button>}
        {moves >= 9 && !winner && <button onClick={resetGame}> Start New Game </button>}
      <div className='grid grid-cols-3 gap-0 rounded-lg overflow-hidden border-2 border-gray-400'> {/* Add a negative margin-top */}
        {board.map((_, index) => renderCell(index))} 
      </div>
    </div>


  );
};

export default TicTacToe;