import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import GreenButton from "../../shared/GreenButton";
import DisplayHeading from "../../shared/Text";

export default function CreateTransaction() {
    return (
		<Container className="mt-5 form-container">
      <Row className="justify-content-md-center">
        <DisplayHeading
          title="Create a New Transaction"
        />
        <Col md="6" className="form-border rounded-3 p-5">
          <h2>Transaction Details</h2>
          <Form>
            <Form.Group controlId="payee">
              <Form.Label>Payee</Form.Label>
              <Form.Control type="text" placeholder="Enter payee" />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select">
                <option disabled selected>Please select an option</option>
                <option>Groceries</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Subscriptions</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
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

