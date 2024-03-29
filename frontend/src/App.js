import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/tictactoe" element={<TicTacToe />}></Route>
          <Route path="/tictactoe/:gameId" element={<TicTacToe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
