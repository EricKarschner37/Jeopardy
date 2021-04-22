import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Join from './Join';
import Wager from './Wager';
import { useCookies } from 'react-cookie';

let socket = null;
let finalName = "";

const Interface = (props) => {
  const [connected, setConnected] = useState(false);
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [cost, setCost] = useState("");
  const [wager, setWager] = useState(0);
  const [needWager, setNeedWager] = useState(false);
  const [buzzed, setBuzzed] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['player-cookies'])
  const [name, setName] = useState((cookies.hasOwnProperty('name')) ? cookies.name : "");
  const [error, setError] = useState("");

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
    setCookie('name', event.target.value);
    setName(event.target.value);
  }

  const handleWagerChange = (event) => {
    setWager(event.target.value);
  }

  const connect = (e) => {
    if (isValid(name) && socket && socket.readyState == 1) {
      setError("");
      const data = {request: 'register', name: name};
      socket.send(JSON.stringify(data));
    } else if (!isValid(name)) {
      setError("Invalid name");
    } else {
      setError("Something went wrong. Please refresh the page and try again.")
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
    console.log("useEffect: Establishing socket connection")
    socket = new WebSocket(`wss://jeopardy.karschner.studio/ws/buzzer`)
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message === "state") {
        showState(data);
      }
      setConnected(true);
    }

    if (finalName != "") {
      connect()
    }

    //Cleanup code
    return () => {
      setConnected(false);
      socket.close();
    };
  }, [name]);

  if (!connected || !finalName) {
    return (
      <Join error={error} onChange={handleNameChange} name={name} onSubmit={connect}/>
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
