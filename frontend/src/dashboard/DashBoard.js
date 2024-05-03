import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import ExportButton from "../shared/ExportButton";
import DisplayHeading from "../shared/Text";
import { Row, Col, Container } from "react-bootstrap";
import { Budgets } from "../budget/BudgetPlanner";

const Dashboard = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			document.title = user
				? `Hello, ${user.displayName}!`
				: "Welcome to Pokket";
		});

		return () => unsubscribe();
	}, []);

	return (
		<Container fluid>
			{user ? (
				<>
					<Row>
						<Col>
							<DisplayHeading
								subtitle={`Hello, ${user.displayName}!`}
								isLeftAlignment={true}
							></DisplayHeading>
						</Col>
					</Row>
					<Row>
						<Budgets />
					</Row>
					<Row>
						<Col className="col-3 ms-auto text-end">
							<ExportButton buttonText={"Export Report"} />
						</Col>
					</Row>
				</>
			) : (
				<DisplayHeading subtitle={"Welcome to Pokket!"}></DisplayHeading>
			)}
		</Container>
	);
};

export default Dashboard;