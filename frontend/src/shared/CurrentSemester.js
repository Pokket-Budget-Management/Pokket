import React from "react";
import { Row } from "react-bootstrap";

function CurrentSemester() {
	const getCurrentSemester = () => {
		const currentDate = new Date();
		const month = currentDate.getMonth();
		if (month >= 8) {
			return "Fall";
		} else {
			return "Spring";
		}
	};

	return (
		<Row className="mt-3 me-2 m-auto">{getCurrentSemester()} Semester</Row>
	);
}

export default CurrentSemester;
