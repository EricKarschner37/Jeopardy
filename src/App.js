import * as React from "react";
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

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <div className="global-root">
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
    </div>
  );
}

export default App;
