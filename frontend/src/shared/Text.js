// DisplayHeading.js

import React from "react";
import "./Text.css";

const DisplayHeading = ({ title, subtitle }) => (
	<h1 className="text-center mb-3 display-heading">
		{title} <br /> <div className="green merriweather-black">{subtitle}</div>
	</h1>
);

export default DisplayHeading;
