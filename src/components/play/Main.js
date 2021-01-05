import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Join from './Join';
import Wager from './Wager';

let socket = null;
let finalName = "";

const Interface = (props) => {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [cost, setCost] = useState("");
  const [wager, setWager] = useState(0);
  const [needWager, setNeedWager] = useState(false);

  const showState = (json) => {
    setClue(json.state === 'daily_double' ? "Daily Double!" : json.clue)
    setAnswer(json.state === 'answer' ? json.answer : "")
    setNeedWager(json.state === 'daily_double' && json.player === finalName)
    console.log(name)
  }

  const isValid = (name) => {
    return name.length < 16 && name.length > 0 && !name.includes(" ");
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleWagerChange = (event) => {
    setWager(event.target.value);
  }

  const connect = (e) => {
    if (isValid(name) && socket) {
      const data = {request: 'register', name: name};
      socket.send(JSON.stringify(data));
    }
    e.preventDefault();
    finalName = name;
  }

  const submitWager = (e) => {
    if (socket) {
      const data = {request: 'wager', amount: parseInt(wager)};
      socket.send(JSON.stringify(data));
    }
    e.preventDefault();
  }

  const buzz = () => {
    if (socket) {
      socket.send(JSON.stringify({request: 'buzz'}))
    }
  }

  useEffect(() => {
    if (!socket) {
      socket = new WebSocket('wss://jeopardy.karschner.studio/ws/buzzer/')
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.message === 'state') {
          showState(data);
        } else if (data.message === 'connected') {
          setConnected(true)
        }
      }
      console.log("socket created")
    }
  })

  if (!connected) {
    return (
      <Join onChange={handleNameChange} name={name} onSubmit={connect}/>
    )
  }

  return (
    <div className="center">
      <h1 class="name text-weight-bold">{name}</h1>
      <p class="normal font-weight-normal">{clue}</p>
      <p class="normal font-weight-bold">{answer}</p>
      {!needWager && <Button variant="primary" onClick={buzz}>Buzz</Button>}
      {needWager && <Wager onChange={handleWagerChange} wager={wager} onSubmit={submitWager} />}
    </div>
  )
}

export default Interface;
