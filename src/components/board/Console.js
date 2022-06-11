import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";

const Console = (props) => {
  const { num } = useParams();

  return (
    <div className="center console">
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.beginNextRound}
      >
        Begin {props.nextRound}
      </button>
      <a href={`${window.location.protocol}//${window.location.host}/${num}/play`}>
        <div className="center">
          <QRCode
            includeMargin={true}
            className="center"
            value={`${window.location.protocol}//${window.location.host}/${num}/play`}
          />
        </div>
      </a>
      <p className="normal font-weight-light">Scan to join!</p>
    </div>
  );
};

export default Console;
