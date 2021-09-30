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
import PlayerScreen from './components/play/PlayerScreen';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const launchGame = () => {
}

function App() {
  return (
    <Router>
      <Switch>
		<Route path="/:num/play">
		  <Container className="d-flex justify-content-center">
			<PlayerScreen />
		  </Container>
		</Route>
        <Route path="/play">
          <Container className="d-flex justify-content-center">
            <PlayerScreen />
          </Container>
        </Route>
			<Route path="/:num/board">
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
