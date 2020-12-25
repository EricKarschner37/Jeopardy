import React from 'react';
import Player from './Player'

const PlayerDisplay = (props) => {
  return (
    <table id="player">
      <tr><th className="player">Player</th><th className="player">Balance</th></tr>
      {props.players.map(player => <Player name={player.name} balance={player.balance} />)}
    </table>
  )
}

export default PlayerDisplay;
