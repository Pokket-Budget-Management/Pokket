import React, { useState } from "react";
import { Table, Form, Row, Col, Container } from "react-bootstrap";
import "./TransactionList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import GreenButton from "../shared/GreenButton";
import { Navigate } from "react-router-dom";
import DisplayHeading from "../shared/Text";

const TransactionList = () => {
	const [transactions, setTransactions] = useState([
		{
			date: "3/7/2024",
			description: "Something, Inc",
			category: "Subscription",
			amount: "5.99",
		},
		{
			date: "3/7/2024",
			description: "Spotify",
			category: "Subscription",
			amount: "123.95",
		},
		{
			date: "3/7/2024",
			description: "Ralph's",
			category: "Grocery",
			amount: "50.00",
		},
	]);

	const handleCategoryChange = (transaction, e) => {
		const newCategory = e.target.value;
		const newTransactions = transactions.map((t) =>
			t === transaction ? { ...t, category: newCategory } : t
		);
		setTransactions(newTransactions);
	};

	return (
		<Container className="mt-5 form-container">
			<Row className="justify-content-md-center">
				<DisplayHeading
					title="Categorize your transactions to"
					subtitle="manage your finances
					effectively"
				/>
				{/* <h1 className="my-4">
					Categorize your transactions to <br /> manage your finances
					effectively
				</h1> */}
			</Row>
			<Container>
				<h3 className="my-4">Your Transactions</h3>
				<Table bordered hover>
					<thead>
						<tr>
							<th>Transaction</th>
							<th>Amount</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, index) => (
							<tr key={index}>
								<td>
									<div>
										<p>{transaction.description}</p>
										<p className="text-muted small">{transaction.date}</p>
									</div>
								</td>
								<td className="text-primary">${transaction.amount}</td>
								<td style={{ position: "relative" }}>
									<FontAwesomeIcon
										icon={faCaretDown}
										style={{
											position: "absolute",
											right: "20px",
											top: "40%",
											transform: "translateY(-50%)",
										}}
									/>
									<Form.Control
										as="select"
										value={transaction.category}
										onChange={(e) => handleCategoryChange(transaction, e)}
									>
										<option value="Subscription">Subscription</option>
										<option value="Grocery">Grocery</option>
										<option value="Other">Other</option>
									</Form.Control>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
			<Row className="mb-3">
				<Col className="text-end">
					<GreenButton size="lg">Add a Transaction</GreenButton>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionList;
