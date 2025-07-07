import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const RateSettings = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...values, [field]: Number(value) });
  };

  return (
    <div className="mb-4 p-3 border rounded">
      <h5 className="mb-3 fw-bold">Discount Rate Settings</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Lower Bound (%)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={values.lowerBoundRate}
              onChange={(e) => handleChange('lowerBoundRate', e.target.value)}
              required
              data-testid="lower-bound-rate-input"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Upper Bound (%)</Form.Label>
            <Form.Control
              type="number"
              min={values.lowerBoundRate + values.increment}
              step="0.01"
              value={values.upperBoundRate}
              onChange={(e) => handleChange('upperBoundRate', e.target.value)}
              required
              data-testid="upper-bound-rate-input"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Increment (%)</Form.Label>
        <Form.Control
          type="number"
          min="0.01"
          step="0.01"
          value={values.increment}
          onChange={(e) => handleChange('increment', e.target.value)}
          required
          data-testid="increment-input"
        />
        <Form.Text className="text-muted">
          Step size between discount rates
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default RateSettings;