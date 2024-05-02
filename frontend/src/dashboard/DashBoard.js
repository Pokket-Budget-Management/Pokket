import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import ExportButton from "../shared/ExportButton";

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

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			setUser(null);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1 className="text-center mb-4">
				{user ? `Hello, ${user.displayName}!` : "Welcome to Pokket"}
				{user ? (
					<a href="#" onClick={handleSignOut} className="ms-2">
						Sign Out
					</a>
					
				) : (
					<div>
						<a href="/signup" className="ms-2">
							Sign Up
						</a>
						<a href="/signin" className="ms-2">
							Sign In
						</a>
					</div>
				)}
			</h1>
			<a href="/budget" className="ms-2">
				budget
			</a>
			<ExportButton buttonText={"Export Report"} />
		</div>
	);
};

export default Dashboard;
