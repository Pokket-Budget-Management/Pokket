import React from "react";
import { Row } from "react-bootstrap";

function CurrentMonth() {
	const getCurrentMonthRange = () => {
		const currentDate = new Date();
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const currentMonth = monthNames[currentDate.getMonth()];
		const startDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);
		const endDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0
		);
		const startDateString = startDate.getDate();
		const endDateString = endDate.getDate();
		return `${currentMonth} ${startDateString}-${endDateString}`;
	};

	return <Row className="mt-3 me-2 m-auto">{getCurrentMonthRange()}</Row>;
}

export default CurrentMonth;
