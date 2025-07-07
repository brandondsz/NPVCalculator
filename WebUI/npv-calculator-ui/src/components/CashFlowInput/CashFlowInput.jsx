import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const CashFlowInput = ({ cashFlows, setCashFlows }) => {
  const addCashFlow = () => {
    setCashFlows([...cashFlows, 0]);
  };

  const removeCashFlow = (index) => {
    if (cashFlows.length <= 1) return;
    const newCashFlows = [...cashFlows];
    newCashFlows.splice(index, 1);
    setCashFlows(newCashFlows);
  };

  const updateCashFlow = (index, value) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = Number(value) || 0;
    setCashFlows(newCashFlows);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label className="fw-bold">Cash Flows</Form.Label>
      {cashFlows.map((cashFlow, index) => (
        <Row key={index} className="mb-2 g-2 align-items-center">
          <Col xs={8}>
            <Form.Control
              type="number"
              value={cashFlow}
              onChange={(e) => updateCashFlow(index, e.target.value)}
              placeholder={`Cash flow ${index + 1}`}
              required
            />
          </Col>
          <Col xs={4}>
            <Button
              variant="outline-danger"
              onClick={() => removeCashFlow(index)}
              disabled={cashFlows.length <= 1}
              className="removeCashflow w-100"
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button 
        variant="outline-primary" 
        onClick={addCashFlow}
        className="mt-2"
      >
        Add Cash Flow
      </Button>
    </Form.Group>
  );
};

export default CashFlowInput;