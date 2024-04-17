import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {BiBasket, BiCartAlt, BiCameraMovie, BiRefresh, BiHomeAlt} from "react-icons/bi";
import GreenButton from "../../shared/GreenButton";
import CurrentMonth from '../../shared/CurrentMonth';
import "./BudgetPlanner.css";

export default function BudgetPlanner() {
  return (
    <Container className="mt-5 form-container">
        <Row className="justify-content-md-left">
            <h1 className="text-left mb-3">
                Achieve your goals with <br /> <div className="green merriweather-black">Budget Planner</div>
            </h1>
        </Row>
        <Row className='m-auto'>
            <Col md={6}/>
            <Col md={6} className="d-flex justify-content-end">
                <GreenButton type="button" size="lg" /*to="/create-budget"*/>
                    Create a New Budget
                </GreenButton>
            </Col>
        </Row>
        <Row className='m-auto'>
            <Col md={6}>
                <p className="text-left mb-0 font-size-lg">Monthly Budgets</p>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
                <p className="text-muted text-end mb-0">
                    <CurrentMonth />
                </p>
            </Col>
        </Row>
        <Row className="mt-0 m-auto">
            <Col md={12}>
                <Table>
                    <tbody>
                        <tr>
                            <td className="icon-container">
                                <BiBasket className="icon-pink" />
                                <div className="ms-2">
                                    Groceries
                                    <div className="text-muted">
                                        {/*Logic to get number of transactions*/}
                                    </div>
                                </div>
                            </td>
                            <td className="text-end">
                            {/* Logic to get data from database */}
                            {/* Logic for little graph next to budget value */}
                            </td>
                        </tr>
                        <tr>
                            <td className="icon-container">
                                <BiCartAlt className="icon-orange" />
                                <div className="ms-2">
                                    Shopping
                                    <div className="text-muted">
                                        {/*Logic to get number of transactions*/}
                                    </div>
                                </div>
                            </td>
                            <td className="text-end">
                            {/* Logic to get data from database */}
                            {/* Logic for little graph next to budget value */}
                            </td>
                        </tr>
                        <tr>
                            <td className="icon-container">
                                <BiCameraMovie className="icon-purple" />
                                <div className="ms-2">
                                    Entertainment
                                    <div className="text-muted">
                                        {/*Logic to get number of transactions*/}
                                    </div>
                                </div>
                            </td>
                            <td className="text-end">
                            {/* Logic to get data from database */}
                            {/* Logic for little graph next to budget value */}
                            </td>
                        </tr>
                        <tr>
                            <td className="icon-container">
                                <BiRefresh className="icon-green" />
                                <div className="ms-2">
                                    Subscriptions
                                    <div className="text-muted">
                                        {/*Logic to get number of transactions*/}
                                    </div>
                                </div>
                            </td>
                            <td className="text-end">
                            {/* Logic to get data from database */}
                            {/* Logic for little graph next to budget value */}
                            </td>
                        </tr>
                        <tr>
                            <td className="icon-container">
                                <BiHomeAlt className="icon-yellow" />
                                <div className="ms-2">
                                    Utilities
                                    <div className="text-muted">
                                        {/*Logic to get number of transactions*/}
                                    </div>
                                </div>
                            </td>
                            <td className="text-end">
                            {/* Logic to get data from database */}
                            {/* Logic for little graph next to budget value */}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  );
}
