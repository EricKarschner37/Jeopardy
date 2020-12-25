import React from 'react';

import logo from './logo.svg';
import Game from './components/Game';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Game number={3030}/>
  );
}

export default App;
