import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GreenButton from "../shared/GreenButton";
import DisplayHeading from "../shared/Text";

export default function CreateBudget() {
	const [form, setForm] = useState({
		category: "",
		amount: "",
		description: "",
		period: "",
	});

	const [errors, setErrors] = useState({
		categoryError: "",
		amountError: "",
		descriptionError: "",
		periodError: "",
	});

	const validateCategory = (category) => {
		if (category === "") {
			return "Category is required.";
		}
		return null;
	};

	const validateAmount = (amount) => {
		if (amount === "") {
			return "Amount is required.";
		}
		if (isNaN(amount)) {
			return "Amount must be a number.";
		}
		return null;
	};

	const validateDescription = (description) => {
		if (description === "") {
			return "Description is required.";
		}
		return null;
	};

	const validatePeriod = (period) => {
		if (period === "") {
			return "Period is required.";
		}
		return null;
	};

	const validateForm = () => {
		if (form.category === "") {
			setErrors({ ...errors, categoryError: "Category is required." });
			return false;
		}

		const amountError = validateAmount(form.amount);
		if (amountError) {
			setErrors({ ...errors, amountError });
			return false;
		}

		const descriptionError = validateDescription(form.description);
		if (descriptionError) {
			setErrors({ ...errors, descriptionError });
			return false;
		}

		const periodError = validatePeriod(form.period);
		if (periodError) {
			setErrors({ ...errors, periodError });
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
				<DisplayHeading title="Create a New Budget" />
				<Col md="6" className="form-border rounded-3 p-5">
					<h2>Budget Details</h2>
					<Form onSubmit={handleSubmit}>
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
							{errors.amountError && (
								<div style={{ color: "red" }}>{errors.amountError}</div>
							)}
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter description"
								value={form.description}
								onChange={(e) =>
									setForm({ ...form, description: e.target.value }) &
									setErrors({ ...errors, descriptionError: "" })
								}
							/>
							{errors.descriptionError && (
								<div style={{ color: "red" }}>{errors.descriptionError}</div>
							)}
						</Form.Group>

						<Form.Group controlId="period">
							<Form.Label>Period*</Form.Label>
							<Form.Control
								as="select"
								value={form.period}
								onChange={(e) =>
									setForm({ ...form, period: e.target.value }) &
									setErrors({ ...errors, periodError: "" })
								}
							>
								<option disabled value="">
									Please select an option
								</option>
								<option value="Biweekly">Biweekly</option>
								<option value="Monthly">Monthly</option>
								<option value="Semester">Semester</option>
							</Form.Control>
							{errors.periodError && (
								<div style={{ color: "red" }}>{errors.periodError}</div>
							)}
						</Form.Group>
					</Form>
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
