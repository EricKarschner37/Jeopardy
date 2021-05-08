import React from 'react';
import {isMobile} from 'react-device-detect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
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
		  {isMobile ? <Redirect to="/play" /> : <Launch />}
		</Route>
      </Switch>
    </Router>
  );
}

export default App;
