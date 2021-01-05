import React, { useState, useEffect } from 'react';
import Join from './Join';

let socket = null;

const Interface = (props) => {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");

  const showState = (json) => {
    
  }

  const isValid = (name) => {
    return name.length < 16 && name.length > 0 && !name.includes(" ");
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const connect = (e) => {
    if (isValid(name) && socket) {
      const data = {request: 'register', name: name};
      socket.send(JSON.stringify(data));
    }
    e.preventDefault();
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
    <h1>Connected!</h1>
  )
}

export default Interface;
