import React from 'react';

const GameBoard = ({ board, handleClick, isViewMode }) => {
    const renderCell = (index) => (
      <button
        key={index}
        className={`w-24 h-24 bg-white font-bold text-xl text-gray-800 hover:bg-gray-100 ${index !== 0 && index !== 1 && index !== 2 ? 'border-t-2' : ''} ${index !== 0 && index !== 3 && index !== 6 ? 'border-l-2' : ''} border-gray-400`}
        onClick={() => handleClick(index)}
        disabled={isViewMode}
      >
        {board[index]}
      </button>
    );
  
    return (
      <div className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden border-2 border-gray-400">
        {board.map((_, index) => renderCell(index))}
      </div>
    );
  };

export default GameBoard; 
  