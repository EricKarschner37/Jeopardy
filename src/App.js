import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Launch from './components/Launch';

import logo from './logo.svg';
import Game from './components/board/Game';
import Interface from './components/play/Main';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const launchGame = () => {
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Container className="d-flex justify-content-center">
            <Interface />
          </Container>
        </Route>
        <Route path="/board">
          <Game />
        </Route>
		<Route path="/">
		  <Launch />
		</Route>
      </Switch>
    </Router>
  );
}

export default App;
