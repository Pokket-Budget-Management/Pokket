import { Navbar, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "./logo.png"; // import the logo

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
			<Navbar.Brand className="me-auto ms-5">
				<img
					src={logo}
					width="47"
					height="39"
					className="d-inline-block align-top"
					alt="Pokket Logo"
				/>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="me-auto ms-5">
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
