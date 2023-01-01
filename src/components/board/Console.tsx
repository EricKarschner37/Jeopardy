import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import { Flex } from "components/lib/Flex";

type ConsoleProps = {
  roundAction: () => void;
  roundActionLabel: string;
};

const Console = ({ roundAction, roundActionLabel }: ConsoleProps) => {
  const { num } = useParams<{ num: string }>();

  return (
    <Flex direction="column" align="center">
      <button type="button" className="btn btn-primary" onClick={roundAction}>
        {roundActionLabel}
      </button>
      <a
        href={`${window.location.protocol}//${window.location.host}/${num}/play`}
      >
        <div className="center">
          <QRCode
            includeMargin={true}
            className="center"
            value={`${window.location.protocol}//${window.location.host}/${num}/play`}
          />
        </div>
      </a>
      <p className="normal font-weight-light">Scan to join!</p>
    </Flex>
  );
};

export default Console;
