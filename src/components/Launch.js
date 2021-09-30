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
		const url = `https://${process.env.REACT_APP_WEBSOCKET_SERVER}/api/start`;
		console.log(url);
		fetch(url, {
				method: 'POST',
				body: JSON.stringify(msg),
		})
					.then(response => {console.log(response); return response})
					.then(response => response.json())
					.then(json => window.location.assign(`https://${window.location.host}/${json['gameNum']}/board`));
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
