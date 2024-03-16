import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import GameHistory from './components/GameHistory';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-col items-center justify-start p-4 flex-grow overflow-y-auto">
          <Switch>
            <Route path="/" exact component={TicTacToe} />
            <Route path="/login" component={LoginPage} />
            <Route path="/history" component={GameHistory} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
