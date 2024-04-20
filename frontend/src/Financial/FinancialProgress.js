import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import GreenButton from "../shared/GreenButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons"; // Importing an appropriate icon for financial progress
import DisplayHeading from "../shared/Text";
import { useNavigate } from "react-router-dom";

const FinancialProgress = () => {
    // Hardcoded values for financial progress
    const financialProgress = [
        { category: "Savings", currentAmount: 1500, targetAmount: 2000 },
        { category: "Investments", currentAmount: 2500, targetAmount: 3000 },
        // Add more financial progress categories as needed
    ];

    const navigate = useNavigate();

    return (
        <Container className="mt-5 form-container">
            <Row className="justify-content-md-center">
                <DisplayHeading
                    title="Track your Financial Progress"
                    subtitle="Monitor your savings, investments, and more"
                />
            </Row>
            <Row className="mt-0 m-auto">
                <Col md={12}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Current Amount</th>
                                <th>Target Amount</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialProgress.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>${item.currentAmount}</td>
                                    <td>${item.targetAmount}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div style={{ width: "80%" }}>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${(item.currentAmount / item.targetAmount) * 100}%` }} aria-valuenow={(item.currentAmount / item.targetAmount) * 100} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="ms-2">{`${((item.currentAmount / item.targetAmount) * 100).toFixed(1)}%`}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="text-end">
                    <GreenButton onClick={() => navigate("/goals/add")} size="lg">
                        Add a Goal
                    </GreenButton>
                </Col>
            </Row>
        </Container>
    );
};

export default FinancialProgress;
