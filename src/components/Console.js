import React from 'react';

const Console = (props) => {
  return (
    <div className="center console">
      <button type="button" class="btn btn-primary" onClick={props.beginDoubleJeopardy}>Begin Double Jeopardy</button>
    </div>
  )
}

export default Console;
