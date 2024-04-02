import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GreenButton from "../../shared/GreenButton";
import DisplayHeading from "../../shared/Text";

const SignUpForm = () => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		firstNameError: "",
		lastNameError: "",
		passwordError: "",
	});

	const [termsAccepted, setTermsAccepted] = useState(false);

	const validatePassword = (password) => {
		const upperCaseRegex = /(?=.*[A-Z])/;
		const numberRegex = /(?=.*[0-9])/;
		const specialCharacterRegex = /(?=.*[!@#$%^&*])/;
		const lengthRegex = /.{8,}/;

		if (!lengthRegex.test(password)) {
			return "Password must be at least 8 characters long.";
		}

		if (!upperCaseRegex.test(password)) {
			return "Password must contain at least one uppercase letter.";
		}

		if (!numberRegex.test(password)) {
			return "Password must contain at least one number.";
		}

		if (!specialCharacterRegex.test(password)) {
			return "Password must contain at least one special character.";
		}

		return null;
	};

	const validateForm = () => {
		if (form.firstName === "") {
			setErrors({ ...errors, firstNameError: "First name is required." });
			return false;
		}

		if (form.lastName === "") {
			setErrors({ ...errors, lastNameError: "Last name is required." });
			return false;
		}

		const passwordError = validatePassword(form.password);
		if (passwordError) {
			setErrors({ ...errors, passwordError });
			return false;
		}

		if (!termsAccepted) {
			return false;
		}

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Your form submission logic here
			console.log("Form submitted:", form);
		}
	};

	return (
		<Container className="mt-5 form-container">
			<Row className="justify-content-md-center">
				<DisplayHeading
					title="Get even more financial clarity"
					subtitle="with a Pokket account"
				/>
				<Col md="6" className="form-border rounded-3 p-5">
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formFirstName">
							<Form.Label>First Name*</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter first name"
								value={form.firstName}
								onChange={(e) =>
									setForm({ ...form, firstName: e.target.value }) &
									setErrors({ ...errors, firstNameError: "" })
								}
							/>
							{errors.firstNameError && (
								<Form.Text className="text-muted">
									{errors.firstNameError}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="formLastName">
							<Form.Label>Last Name*</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter last name"
								value={form.lastName}
								onChange={(e) =>
									setForm({ ...form, lastName: e.target.value }) &
									setErrors({ ...errors, lastNameError: "" })
								}
							/>
							{errors.lastNameError && (
								<Form.Text className="text-muted">
									{errors.lastNameError}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>Password*</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								value={form.password}
								onChange={(e) => {
									setForm({ ...form, password: e.target.value });
									setErrors({
										...errors,
										passwordError: validatePassword(e.target.value),
									});
								}}
							/>
							{errors.passwordError && (
								<Form.Text className="text-muted">
									{errors.passwordError}
								</Form.Text>
							)}
							<ul className="text-muted small mt-1 pl-2">
								<li>One uppercase letter</li>
								<li>One number</li>
								<li>One special character</li>
								<li>Eight character minimum</li>
							</ul>
						</Form.Group>

						<Form.Check
							type="checkbox"
							label="By signing up, you agree to our Terms of Service and that you have read our Privacy Policy"
							checked={termsAccepted}
							onChange={(e) => setTermsAccepted(e.target.checked)}
						/>
						<Row className="mt-3 m-auto">
							<GreenButton type="submit" size="lg">
								Continue
							</GreenButton>
						</Row>
						<Row className="mt-3 m-auto">
							<p className="text-muted text-center">
								Already a member? <a href="/login">Log In</a>
							</p>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default SignUpForm;
