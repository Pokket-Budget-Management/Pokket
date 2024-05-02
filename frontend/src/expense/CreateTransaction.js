import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import GreenButton from "../shared/GreenButton";
import DisplayHeading from "../shared/Text";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    payee: "",
    category: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({
		categoryError: "",
		amountError: "",
		descriptionError: "",
		periodError: "",
	});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDocRef = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (userDocRef.exists()) {
      const transactionRef = collection(userDocRef.ref, `transactions`);
      await addDoc(transactionRef, {
        date: new Date(),
        description: formData.description,
        amount: formData.amount,
        payee: formData.payee,
        category: formData.category
      });
      console.log("Transaction successfully added!");
    } else {
      console.error("Error adding transaction: ");
    }
    navigate("/transactions")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                name="payee"
                value={formData.payee}
                onChange={(e) =>
                  setFormData({...formData, payee: e.target.value}) &
                  setErrors({ ...errors, payeeError: "" })
                }
              />
              {errors.payeeError && (
								<div style={{ color: "red" }}>{errors.payeeError}</div>
							)}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({...formData, category: e.target.value}) &
                  setErrors({ ...errors, categoryError: "" })
                }
              >
                <option disabled value="">Please select an option</option>
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
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({...formData, description: e.target.value}) &
                  setErrors({ ...errors, descriptionErrorError: "" })
                }
              />
              {errors.descriptionErrorError && (
								<div style={{ color: "red" }}>{errors.descriptionErrorError}</div>
							)}
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({...formData, amount: e.target.value}) &
                  setErrors({ ...errors, amountError: "" })
                }
              />
              {errors.amountError && (
								<div style={{ color: "red" }}>{errors.amountError}</div>
							)}
            </Form.Group>
            <hr />
            <p className="text-center">or</p>
            <div className="text-center mb-3">
              <input type="file" />
            </div>
            <Row className="justify-content-md-end mt-3">
              <Col md="6" className="text-right">
                <GreenButton as={Link} to="transactions">
                  Cancel
                </GreenButton>{" "}
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
