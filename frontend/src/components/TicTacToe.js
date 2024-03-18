import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GameBoard from './GameBoard';
const apiUrl = process.env.REACT_APP_API_URL;


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)) // using state to define the board which will need to be "remembered"
  const [isXNext, setIsXNext] =  useState(true); //using state to define who's turn it is: X or O
  const [moves, setMoves] = useState(0);
  const [gameIdDB, setGameIdDB] = useState(false); //keeps track of the game id in the db
  const [isViewMode, setIsViewMode] = useState(false);
  const gameIdParam = useParams().gameId; //this is the variable when the method is called in view mode 
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchData = async () => {
      if (gameIdParam) { // a id has been passed in via the url. This is view mode
        setIsViewMode(true);
        try {
          const response = await axios.get(`${apiUrl}/games/${gameIdParam}`);
          setBoard(response.data.position);
          setIsXNext(response.data.turn === 'X'); //technically don't need this line since we just need board positioning for view
        } catch (error) {
          console.log(`Error fetching game with ID ${gameIdParam}`);
        }
      } else {
        resetGame();
      } }
    fetchData();
  }, [gameIdParam]);

  const handleClick = async (index) => {
    if (isViewMode) {
      return; //we're not playing the game in view mode
    }

    const newBoard = [...board] //this effectively copies the board to this variable
    if (newBoard[index] || winner) return; //If the space has already been filled or the winner is decided return early
    newBoard[index] = isXNext ? 'X' : 'O';  // deciding who's move it is based on the isXNext variable and filling in the board accoringly
    
    // NOTE: React gives you these functions for free
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setMoves(prevMoves => prevMoves + 1); //this is functionally the better way to update the previous value.

    if(typeof gameIdParam === 'undefined' || gameIdParam === null) { //we're in play mode if this is
      updateBoard(newBoard);
    }
   };

  // This updates the board in the DB.
  const updateBoard = async (newBoard) => {
    try {
      await axios.put(`${apiUrl}/games/${gameIdDB}`, {
        position: newBoard,
        turn: isXNext ? 'O' : 'X',
        winner: calculateWinner(newBoard)
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          setGameIdDB(prevGameIdDB => response.data.game.id);
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

  const backHome = () => {
    navigate('/home');
  }


// This is where the main board gets rendered.
  // Using the map function, we turn every cell into its own react component using the render cell functionality
  return (
    <div className="flex flex-col items-center justify-start p-4 flex-grow overflow-y-auto">
      <button
        onClick={backHome}
        className="absolute top-30 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back Home
      </button>
      <div className="flex flex-col items-center justify-center h-screen border border-grey-200">
        <div className="text-2xl font-semibold mb-4">{status}</div>
        {!winner && moves >= 9 && (
          <button onClick={resetGame}>Start New Game</button>
        )}
        <GameBoard board={board} handleClick={handleClick} isViewMode={isViewMode} />
      </div>
    </div>
  );
};


export default TicTacToe;