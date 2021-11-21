import React from "react";
import { isMobile } from "react-device-detect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Index from "./components/index";

import Game from "./components/board/Game";
import Launch from "./components/Launch";
import PlayerScreen from "./components/play/PlayerScreen";
import { Join } from "./components/play/Join";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Container className="d-flex justify-content-center">
      <Router>
        <Switch>
          <Route path="/:num/play">
              <PlayerScreen />
          </Route>
          <Route path="/play">
            <Join />
          </Route>
          <Route path="/:num/board">
            <Game />
          </Route>
          <Route path="/board">
            <Launch />
          </Route>
          <Route path="/">
            {isMobile ? <Redirect to="/play" /> : <Index />}
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
