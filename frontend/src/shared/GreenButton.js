// GreenButton.js

import React from "react";
import { Button } from "react-bootstrap";

const GreenButton = ({ children, ...props }) => (
	<Button variant="primary" className="green-button" {...props}>
		{children}
	</Button>
);

const greenButtonStyles = `
  .green-button {
    background-color: #7ED348;
    border-width: 0;
  }

  .green-button:hover {
    // background-opacity: 0.8;
  }
`;

export default () => (
	<>
		<GreenButton>Continue</GreenButton>
		<style>{greenButtonStyles}</style>
	</>
);
