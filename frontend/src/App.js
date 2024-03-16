import React from 'react';
import TicTacToe from './components/TicTacToe';
import Header from './components/Header';


const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-start p-4 flex-grow overflow-y-auto">
        <TicTacToe />
      </div>
    </div>
  );
};

export default App;
