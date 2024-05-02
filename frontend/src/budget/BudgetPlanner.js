import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
	BiBasket,
	BiCartAlt,
	BiCameraMovie,
	BiRefresh,
	BiHomeAlt,
} from "react-icons/bi";
import GreenButton from "../shared/GreenButton";
import CurrentMonth from "../shared/CurrentMonth";
import GetBudgetData from "./GetBudgetData";
import DisplayHeading from "../shared/Text";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import "./BudgetPlanner.css";
import GetNumTransactions from "./getNumTransactions";
import GetTransactionData from "./GetTransactionData";

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
							<tr>
								<td className="icon-container">
									<BiBasket className="icon-pink" />
									<div className="ms-2">
										Groceries
										<div className="text-muted">
											<GetNumTransactions category="Groceries" />
										</div>
									</div>
								</td>
								<td className="text-end">
									{/* Logic to get data from database */}
									<GetTransactionData category="Groceries" />
									<GetBudgetData category="Groceries" />
								</td>
							</tr>
							<tr>
								<td className="icon-container">
									<BiCartAlt className="icon-orange" />
									<div className="ms-2">
										Shopping
										<div className="text-muted">
											<GetNumTransactions category="Shopping" />
										</div>
									</div>
								</td>
								<td className="text-end">
									{/* Logic to get data from database */}
									<GetTransactionData category="Shopping" />
									<GetBudgetData category="Shopping" />
								</td>
							</tr>
							<tr>
								<td className="icon-container">
									<BiCameraMovie className="icon-purple" />
									<div className="ms-2">
										Entertainment
										<div className="text-muted">
											<GetNumTransactions category="Entertainment" />
										</div>
									</div>
								</td>
								<td className="text-end">
									{/* Logic to get data from database */}
									<GetTransactionData category="Entertainment" />
									<GetBudgetData category="Entertainment" />
								</td>
							</tr>
							<tr>
								<td className="icon-container">
									<BiRefresh className="icon-green" />
									<div className="ms-2">
										Subscriptions
										<div className="text-muted">
											<GetNumTransactions category="Subscriptions" />
										</div>
									</div>
								</td>
								<td className="text-end">
									{/* Logic to get data from database */}
									<GetTransactionData category="Subscriptions" />
									<GetBudgetData category="Subscriptions" />
								</td>
							</tr>
							<tr>
								<td className="icon-container">
									<BiHomeAlt className="icon-yellow" />
									<div className="ms-2">
										Utilities
										<div className="text-muted">
											<GetNumTransactions category="Utilities" />
										</div>
									</div>
								</td>
								<td className="text-end">
									{/* Logic to get data from database */}
									<GetTransactionData category="Utilities" />
									<GetBudgetData category="Utilities" />
								</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		</>
	);
};
export { Budgets };
