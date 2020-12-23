import React from 'react';

import logo from './logo.svg';
import Board from './components/Board';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  let data = {};
  data.request = 'start_game';
  data.game_num = 3030;

  const socket = new WebSocket("wss://jeopardy.karschner.studio/ws/buzzer/server/")
  socket.addEventListener('open', (e) => socket.send(JSON.stringify(data)))

  socket.addEventListener('message', (e) => console.log(e.data))
  return (
    <Container fluid>
      <Row>
        <Col><Board socket={socket}/></Col>
      </Row>
    </Container>
  );
}

export default App;
