// GreenButton.js

import React from "react";
import { Button } from "react-bootstrap";
import "./GreenButton.css";

class GreenButton extends React.Component {
	render() {
		const { children, ...props } = this.props;

		return (
			<Button variant="primary" className="green-button" {...props}>
				{children}
			</Button>
		);
	}
}

export default GreenButton;
