import { Navbar, Nav, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTachometerAlt,
	faExchangeAlt,
	faChartLine,
	faWallet,
	faUser,
	faSignOutAlt,
	faUserCircle,
	faBell,
	faCalendar,
	faTh,
} from "@fortawesome/free-solid-svg-icons";
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
					<Nav.Link href="/">
						<FontAwesomeIcon icon={faTh} /> Dashboard
					</Nav.Link>
					<Nav.Link href="/transactions">
						<FontAwesomeIcon icon={faWallet} /> Transactions
					</Nav.Link>
					<Nav.Link href="/Financial">
						<FontAwesomeIcon icon={faChartLine} /> Financial Progress
					</Nav.Link>
					<Nav.Link href="/budget">
						<FontAwesomeIcon icon={faCalendar} /> Budget Planner
					</Nav.Link>
					{user ? (
						<Nav.Link href="#" onClick={handleSignOut}>
							<FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
						</Nav.Link>
					) : (
						<div>
							<Nav.Link href="/signup">
								<FontAwesomeIcon icon={faUser} /> Sign Up
							</Nav.Link>
							<Nav.Link href="/signin">
								<FontAwesomeIcon icon={faUser} /> Sign In
							</Nav.Link>
						</div>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
