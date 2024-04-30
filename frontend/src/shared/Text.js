// DisplayHeading.js

import React from "react";
import "./Text.css";

const DisplayHeading = ({ title, subtitle, isLeftAlignment = false }) => (
	<h1
		className={`mb-3 display-heading ${
			isLeftAlignment ? `text-left` : "text-center"
		}`}
	>
		{title} <br /> <div className="green merriweather-black">{subtitle}</div>{" "}
	</h1>
);
DisplayHeading.defaultProps = { alignment: false };

export default DisplayHeading;
