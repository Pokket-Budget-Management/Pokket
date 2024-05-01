import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GreenButton from "../shared/GreenButton";
import DisplayHeading from "../shared/Text";

export default function CreateTransaction() {
	const [form, setForm] = useState({
		payee: "",
		category: "",
		description: "",
		amount: "",
	});

	const [errors, setErrors] = useState({
		payeeError: "",
		categoryError: "",
		descriptionError: "",
		amountError: "",
	});

	const validatePayee = (payee) => {
		if (payee === "") {
			return "Payee is required.";
		}
		return null;
	};

	const validateCategory = (category) => {
		if (category === "") {
			return "Category is required.";
		}
		return null;
	};

	const validateDescription = (description) => {
		if (description === "") {
			return "Description is required.";
		}
		return null;
	};

	const validateAmount = (amount) => {
		if (amount === "") {
			return "Amount is required.";
		}
		return null;
	};

	const validateForm = () => {
		const payeeError = validatePayee(form.payee);
		if (form.payee === "") {
			setErrors({ ...errors, payeeError });
			return false;
		}

		const categoryError = validateCategory(form.category);
		if (form.category === "") {
			setErrors({ ...errors, categoryError });
			return false;
		}

		const descriptionError = validateDescription(form.description);
		if (descriptionError) {
			setErrors({ ...errors, descriptionError });
			return false;
		}

		const amountError = validateAmount(form.amount);
		if (amountError) {
			setErrors({ ...errors, amountError });
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
				<DisplayHeading title="Create a New Transaction" />
				<Col md="6" className="form-border rounded-3 p-5">
					<h2>Transaction Details</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="payee">
							<Form.Label>Payee</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter payee"
								value={form.payee}
								onChange={(e) =>
									setForm({ ...form, payee: e.target.value }) &
									setErrors({ ...errors, payeeError: "" })
								}
							/>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								as="select"
								value={form.category}
								onChange={(e) =>
									setForm({ ...form, category: e.target.value }) &
									setErrors({ ...errors, categoryError: "" })
								}
							>
								<option disabled value="">
									Please select an option
								</option>
								<option value="Groceries">Groceries</option>
								<option value="Shopping">Shopping</option>
								<option value="Entertainment">Entertainment</option>
								<option value="Utilities">Utilities</option>
								<option value="Subscriptions">Subscriptions</option>
							</Form.Control>
							{errors.categoryError && (
								<div style={{ color: "red" }}>{errors.categoryError}</div>
							)}
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter description"
							/>
						</Form.Group>
						<Form.Group controlId="amount">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter amount"
								value={form.amount}
								onChange={(e) =>
									setForm({ ...form, amount: e.target.value }) &
									setErrors({ ...errors, amountError: "" })
								}
							/>
						</Form.Group>
					</Form>
					<hr />
					<p className="text-center">or</p>
					<div className="text-center mb-3">
						<input type="file" />
					</div>
				</Col>
			</Row>
			<Row className="justify-content-md-center mt-3">
				<Col md="6" className="text-center">
					<GreenButton type="submit" size="lg">
						Submit
					</GreenButton>
					<h1> </h1>
					<GreenButton type="submit" size="lg">
						Cancel
					</GreenButton>
				</Col>
			</Row>
		</Container>
	);
}
