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

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/transactions" element={<TransactionList />} />
				<Route path="/create-transaction" element={<CreateTransaction />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route
					path="/transactions/add"
					element={<h1>Add New Transaction</h1>}
				/>
				<Route path="/budget-planner" element={<BudgetPlanner />} />
				<Route path="/create-budget" element={<CreateBudget />} />
				<Route
					path="/"
					element={
						<h1 className="text-center mb-4">
							Welcome to Pokket. Please <NavLink to="/signup">sign up</NavLink>.
						</h1>
					}
				/>
				<Route path="/budget-planner" element={<BudgetPlanner />} />
			</Routes>
		</Router>
	);
};

export default App;
