import { Navbar, Nav, NavLink } from "react-bootstrap";

const NavBar = () => {
	return (
		<Navbar bg="light" expand="lg" className="flex-column h-100">
			<Navbar.Brand>Pokket</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto flex-column">
					<Nav.Link href="/">Dashboard</Nav.Link>
					<Nav.Link href="/transactions">Transactions</Nav.Link>
					<Nav.Link href="/Financial">Financial Progress</Nav.Link>
					<Nav.Link href="/budget-planner">Budget Planner</Nav.Link>
					<Nav.Link href="/signup">Sign Up</Nav.Link>
					<Nav.Link href="/signin">Sign In</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
