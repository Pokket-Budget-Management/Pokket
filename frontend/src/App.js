import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";
import SignUpForm from "./user/containers/SignUpForm";
import BudgetPlanner from "./budget/BudgetPlanner";
import CreateBudget from "./budget/CreateBudget";
import CreateTransaction from "./expense/CreateTransaction";
import TransactionList from "./expense/TransactionList";
import SignInForm from "./user/containers/SignInForm";
import "./App.css";
import FinancialProgress from "./Financial/FinancialProgress";
import Dashboard from "./dashboard/DashBoard";
import NavBar from "./shared/NavigationBar";
import { Row, Col, Container } from "react-bootstrap";

const App = () => {
	return (
		<Router>
			<Row className="h-100">
				<Col className="col-3">
					<NavBar />
				</Col>
				<Col>
					<Routes>
						<Route path="/transactions" element={<TransactionList />} />
						<Route path="/Financial" element={<FinancialProgress />} />
						<Route path="/create-transaction" element={<CreateTransaction />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/signin" element={<SignInForm />} />
						<Route
							path="/transactions/add"
							element={<h1>Add New Transaction</h1>}
						/>
						<Route path="/budget-planner" element={<BudgetPlanner />} />
						<Route path="/create-budget" element={<CreateBudget />} />
						<Route path="/" element={<Dashboard />} />
					</Routes>
				</Col>
			</Row>
		</Router>
	);
};

export default App;
