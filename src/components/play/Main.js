import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Join from './Join';
import Wager from './Wager';
import { useCookies } from 'react-cookie';

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
  const [buzzed, setBuzzed] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['player-cookies'])

  if (cookies.hasOwnProperty('name') && cookies.name != name) setName(cookies.name);

  const showState = (json) => {
    setClue(json.name === 'daily_double' ? "Daily Double!" : json.clue)
    setAnswer(json.name === 'response' || json.name === 'board' ? (json.response) : "")
    setNeedWager(json.name === 'daily_double' && json.selected_player === finalName)
	if (json.name === 'clue' && json.selected_player === finalName) {
      setBuzzed(true)
	} else {
	  setBuzzed(false)
	}
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
      setCookie('name', name);
      const data = {request: 'register', name: name};
      socket.send(JSON.stringify(data));
    }
    if (e) e.preventDefault();
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
	  console.log(socket.readyState)
      socket.send(JSON.stringify({request: 'buzz'}))
    }
  }

  useEffect(() => {
    if (!socket || socket.readyState != 1) {
      socket = new WebSocket('wss://jeopardy.karschner.studio/ws/buzzer')
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.message === 'state') {
          showState(data);
          setConnected(true)
		}
      }
      console.log("socket created")

      socket.onclose = (e) => {
        connect()
      }
    }
  })

  if (!connected && !finalName) {
    return (
      <Join onChange={handleNameChange} name={name} onSubmit={connect}/>
    )
  }

  return (
    <div className="center">
	  <div className={buzzed && "buzzed"}>
		<h1 className="name text-weight-bold">{name}</h1>
		<p className="normal font-weight-normal">{clue}</p>
		<p className="normal font-weight-bold">{answer}</p>
	  </div>
      {!needWager && <Button variant="primary" onClick={buzz}>Buzz</Button>}
      {needWager && <Wager onChange={handleWagerChange} wager={wager} onSubmit={submitWager} />}
    </div>
  )
}

export default Interface;
