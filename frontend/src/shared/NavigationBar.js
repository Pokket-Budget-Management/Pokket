import { Navbar, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
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
		<Navbar bg="light" expand="lg" className="flex-column h-100">
			<Navbar.Brand>Pokket</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto flex-column">
					<Nav.Link href="/">Dashboard</Nav.Link>
					<Nav.Link href="/transactions">Transactions</Nav.Link>
					<Nav.Link href="/Financial">Financial Progress</Nav.Link>
					<Nav.Link href="/budget">Budget Planner</Nav.Link>
					{user ? (
						<Nav.Link href="#" onClick={handleSignOut}>
							Sign Out
						</Nav.Link>
					) : (
						<div>
							<Nav.Link href="/signup">Sign Up</Nav.Link>
							<Nav.Link href="/signin">Sign In</Nav.Link>
						</div>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
