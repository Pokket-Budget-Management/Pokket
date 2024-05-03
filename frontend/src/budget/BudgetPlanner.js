import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";
import {
	BiBasket,
	BiCartAlt,
	BiCameraMovie,
	BiRefresh,
	BiHomeAlt,
} from "react-icons/bi";
import GreenButton from "../shared/GreenButton";
import CurrentMonth from "../shared/CurrentMonth";
import DisplayHeading from "../shared/Text";
import { useNavigate } from "react-router-dom";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import "./BudgetPlanner.css";
import GetNumTransactions from "./getNumTransactions";
import GetTransactionData from "./GetTransactionData";
import { db } from "../firebase";
import { useAuth } from "../auth/Auth";
import CurrentSemester from "../shared/CurrentSemester";

export default function BudgetPlanner() {
	const navigate = useNavigate();

	return (
		<Container className="mt-5 form-container">
			<Row className="justify-content-md-center">
				<DisplayHeading
					title="Achieve your goals with"
					subtitle="Budget Planner"
					isLeftAlignment={true}
				/>
			</Row>
			<Row className="m-auto">
				<Col md={6} />
				<Col md={6} className="d-flex justify-content-end">
					<GreenButton onClick={() => navigate("/budget/add")} size="lg">
						Create a New Budget
					</GreenButton>
				</Col>
			</Row>
			<Budgets />
		</Container>
	);
}

const Budgets = () => {
	const [budgets, setBudgets] = useState([]);
	const [monthlyBudgets, setMonthlyBudgets] = useState([]);
	const [semesterBudgets, setSemesterBudgets] = useState([]);
	const user = useAuth();

	useEffect(() => {
		if (!user) return;
		const fetchBudgets = async () => {
			const userRef = doc(db, "users", user.uid);
			const budgetsRef = collection(userRef, "budgets");
			const querySnapshot = await getDocs(budgetsRef);
			const budgetsList = querySnapshot.docs.map((doc) => doc.data());
			setBudgets(budgetsList);
		};
		fetchBudgets();
	}, [user]);

	useEffect(() => {
		if (!budgets.length) return;
		const monthlyBudgetsList = budgets.filter(
			(budget) => budget.period === "Monthly"
		);
		const semesterBudgetsList = budgets.filter(
			(budget) => budget.period === "Semester"
		);
		setMonthlyBudgets(monthlyBudgetsList);
		setSemesterBudgets(semesterBudgetsList);
	}, [budgets]);

	const getTransactionTotal = (category) => {
		if (!user) return;
		const fetchData = async () => {
			let total = 0;
			const userRef = await doc(db, "users", user.uid);
			const q = query(
				collection(userRef, "transactions"),
				where("category", "==", category)
			); // Updated collection name to 'transactions'

			try {
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					const trans = parseInt(data.amount) || 0;
					total += trans;
				});
			} catch (error) {
				console.error("Error getting budget data:", error);
			}
			console.log(total);
			return total;
		};

		return fetchData();
	};

	return (
		<>
			<Row className="m-auto">
				<Col md={6}>
					<p className="text-left mb-0 font-size-lg">Monthly Budgets</p>
				</Col>
				<Col md={6} className="d-flex justify-content-end">
					<p className="text-muted text-end mb-0">
						<CurrentMonth />
					</p>
				</Col>
			</Row>
			<Row className="mt-0 m-auto">
				<Col md={12}>
					<Table>
						<tbody>
							{monthlyBudgets.map((budget, index) => (
								<tr key={index}>
									<td className="icon-container">
										{/* Use a switch statement or an object to map category to icon */}
										{budget.category === "Groceries" ? (
											<BiBasket className="icon-pink" />
										) : budget.category === "Shopping" ? (
											<BiCartAlt className="icon-orange" />
										) : budget.category === "Entertainment" ? (
											<BiCameraMovie className="icon-purple" />
										) : budget.category === "Subscriptions" ? (
											<BiRefresh className="icon-green" />
										) : (
											<BiHomeAlt className="icon-yellow" />
										)}
										<div className="ms-2">
											{budget.category}
											<div className="text-muted">
												<GetNumTransactions category={budget.category} />
											</div>
										</div>
									</td>
									<td className="text-end">
										{/* Logic to get data from database */}
										<GetTransactionData
											category={budget.category}
											budgetAmount={budget.amount}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
			<Row className="mt-4 m-auto">
				<Col md={6}>
					<p className="text-left mb-0 font-size-lg">Semester Budgets</p>
				</Col>
				<Col md={6} className="d-flex justify-content-end">
					<p className="text-muted text-end mb-0">
						<CurrentSemester />
					</p>
				</Col>
			</Row>
			<Row className="mt-0 m-auto">
				<Col md={12}>
					<Table>
						<tbody>
							{semesterBudgets.map((budget, index) => (
								<tr key={index}>
									<td className="icon-container">
										{/* Use a switch statement or an object to map category to icon */}
										{budget.category === "Groceries" ? (
											<BiBasket className="icon-pink" />
										) : budget.category === "Shopping" ? (
											<BiCartAlt className="icon-orange" />
										) : budget.category === "Entertainment" ? (
											<BiCameraMovie className="icon-purple" />
										) : budget.category === "Subscriptions" ? (
											<BiRefresh className="icon-green" />
										) : (
											<BiHomeAlt className="icon-yellow" />
										)}
										<div className="ms-2">
											{budget.category}
											<div className="text-muted">
												<GetNumTransactions category={budget.category} />
											</div>
										</div>
									</td>
									<td className="text-end">
										{/* Logic to get data from database */}
										<GetTransactionData
											category={budget.category}
											budgetAmount={budget.amount}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</>
	);
};

export { Budgets };
