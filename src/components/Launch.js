import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


const Launch = (props) => {
	const [num, setNum] = useState("");

	const startGame = (e) => {
		e.preventDefault();
		const msg = {
			"num": parseInt(num)
		};
		fetch(`https://${process.env.REACT_APP_WEBSOCKET_SERVER}/start`, {
        mode: 'no-cors',
				method: 'POST',
				body: JSON.stringify(msg),
		})
			.then(data => window.location.assign(`https://${window.location.host}/board`));
	}

	return (
		<Form onSubmit={startGame}>
			{props.error && <Alert variant="danger">{props.error}</Alert>}
			<Form.Group controlId="number">
				<Form.Label>Game Number</Form.Label>
				<Form.Control
					required
					onChange={(e) => setNum(e.target.value)}
					value={num}
					type="number"
					placeholder="Number"
				/>
			</Form.Group>
			<Button variant="success" type="submit">Launch</Button>
		</Form>
	)
}

export default Launch;