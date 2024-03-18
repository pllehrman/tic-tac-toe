import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import Header from './components/Header';
import Signup from './components/Signup';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/game" component={TicTacToe} />
        </Switch>
      </div>
    </Router>
    
  );
};

export default App;
