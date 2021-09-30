import React from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

const Console = (props) => {
  const { num } = useParams();

  return (
    <div className="center console">
      <button type="button" class="btn btn-primary" onClick={props.beginDoubleJeopardy}>Begin Double Jeopardy</button>
      <a href={`https://${window.location.host}/${num}/play`}>
        <div className="center">
          <QRCode includeMargin={true} className="center" value={`https://${window.location.host}/${num}/play`} />
        </div>
      </a>
      <p className="normal font-weight-light">Scan to join!</p>
    </div>
  )
}

export default Console;
