import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";
import SignUpForm from "./user/containers/SignUpForm";
import "./App.css";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route
					path="/"
					element={
						<h1 className="text-center mb-4">
							Welcome to Pokket. Please <NavLink to="/signup">sign up</NavLink>.
						</h1>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
