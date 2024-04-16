import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GreenButton from "../../shared/GreenButton";
import DisplayHeading from "../../shared/Text";

const SignInForm = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		emailError: "",
		passwordError: "",
	});


	const validateForm = () => {
		if (form.email === "") {
			setErrors({ ...errors, emailError: "Email is required." });
			return false;
		}

		if (form.password === "") {
			setErrors({ ...errors, passwordError: "Password is required." });
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
					title="Let's start by signing into your"
					subtitle="Pokket account"
				/>
				<Col md="6" className="form-border rounded-3 p-5">
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email"
								value={form.email}
								onChange={(e) =>
									setForm({ ...form, email: e.target.value }) &
									setErrors({ ...errors, emailError: "" })
								}
							/>
							{errors.emailError && (
								<Form.Text className="text-muted">
									{errors.emailError}
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
									setErrors({...errors, passwordError: "" 
									});
								}}
							/>
							{errors.passwordError && (
								<Form.Text className="text-muted">
									{errors.passwordError}
								</Form.Text>
							)}
						</Form.Group>

                        <Row className="mt-1 m-auto">
							<p className="text-muted text-center">
                            By signing up, you agree to our Terms of Service and that you have read our Privacy Policy
							</p>
						</Row>

						<Row className="mt-1 m-auto">
							<GreenButton type="submit" size="lg">
								Continue
							</GreenButton>
						</Row>

                        <Row className="mt-3 m-auto">
							<p className="text-muted text-center">
                                <a href="/forgotpassword">Forgot your pasword? </a>
							</p>
						</Row>

						<Row className="">
							<p className="text-muted text-center">
								Don't have an account? <a href="/signup">Sign Up</a>
							</p>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default SignInForm;
