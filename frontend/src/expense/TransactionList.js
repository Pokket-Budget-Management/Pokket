import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Container } from "react-bootstrap";
import "./TransactionList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faVimeo } from "@fortawesome/free-brands-svg-icons";
import GreenButton from "../shared/GreenButton";
import DisplayHeading from "../shared/Text";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { auth, db } from "../firebase.js";
import { doc, getDocs, collection, query, where } from "firebase/firestore";

const TransactionList = () => {
	const navigate = useNavigate();
	const user = useAuth();

	const [pendingTransactions, setPendingTransactions] = useState([
		{
			date: "3/7/2024",
			description: "Netflix, Inc",
			category: "Uncategorized",
			amount: "5.99",
		},
		{
			date: "3/7/2024",
			description: "Amazon, Inc.",
			category: "Uncategorized",
			amount: "123.95",
		},
		{
			date: "3/7/2024",
			description: "Ralph's",
			category: "Uncategorized",
			amount: "50.00",
		},
	]);

	const [transactions, setTransactions] = useState([
		// {
		// 	date: "3/7/2024",
		// 	description: "Walmart",
		// 	category: "Grocery",
		// 	amount: "5.99",
		// },
		// {
		// 	date: "3/7/2024",
		// 	description: "Spotify",
		// 	category: "Subscription",
		// 	amount: "123.95",
		// },
	]);

	useEffect(() => {
		const fetchTransactions = async () => {
			if (!user) return; // check if user is authenticated
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const transactionsRef = collection(userDocRef, "transactions");
			const transactionsSnapshot = await getDocs(transactionsRef);
			const transactionsData = transactionsSnapshot.docs.map((doc) =>
				doc.data()
			);
			setTransactions(transactionsData);
			console.log(transactionsData);
		};
		fetchTransactions();
	}, [user]);

	const mockVenmoTransaction = {
		date: new Date().toLocaleDateString(),
		description: "Venmo",
		category: "Uncategorized",
		amount: "10.00",
	};

	const mockPaypalTransaction = {
		date: new Date().toLocaleDateString(),
		description: "Paypal",
		category: "Uncategorized",
		amount: "20.00",
	};

	const handleVenmoLink = () => {
		console.log("Linking Venmo account...");
		setPendingTransactions([...pendingTransactions, mockVenmoTransaction]);
	};

	const handlePaypalLink = () => {
		console.log("Linking Paypal account...");
		setPendingTransactions([...pendingTransactions, mockPaypalTransaction]);
	};

	const handlePendingCategoryChange = (transaction, e) => {
		const newCategory = e.target.value;
		console.log(newCategory);
		const newPendingTransactions = pendingTransactions.filter(
			(t) => t !== transaction
		);
		setPendingTransactions(newPendingTransactions);

		console.log({ ...transaction, category: newCategory });
		const newTransactions = transactions.concat({
			...transaction,
			category: newCategory,
		});
		setTransactions(newTransactions);
	};

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
			</Row>
			<Container>
				<h3 className="my-4">Pending Transactions</h3>
				<Table bordered hover>
					<thead>
						<tr>
							<th>Transaction</th>
							<th>Amount</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{pendingTransactions.map((transaction, index) => (
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
										onChange={(e) =>
											handlePendingCategoryChange(transaction, e)
										}
									>
										<option value="Uncategorized">Uncategorized</option>
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
					<GreenButton size="lg" className="" onClick={handlePaypalLink}>
						<FontAwesomeIcon className="me-2" icon={faPaypal} />
						Link a Paypal Account
					</GreenButton>
					<GreenButton size="lg" className="ms-2" onClick={handleVenmoLink}>
						<FontAwesomeIcon className="me-2" icon={faVimeo} />
						Link a Venmo Account
					</GreenButton>
				</Col>
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
										onChange={(e) =>
											handleCategoryChange(transaction, e, setTransactions)
										}
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
					<GreenButton onClick={() => navigate("/transactions/add")} size="lg">
						Add a Transaction
					</GreenButton>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionList;
