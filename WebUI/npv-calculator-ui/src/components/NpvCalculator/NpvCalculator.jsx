import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import CashFlowInput from '../CashFlowInput/CashFlowInput';
import RateSettings from '../RateSettings/RateSettings';
import ResultsTable from '../ResultsTable/ResultsTable';
import NpvChart from '../NpvChart/NpvChart';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useNpvStream } from '../../hooks/useNpvStream';

const NpvCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [cashFlows, setCashFlows] = useState([3000, 4000, 5000]);
  const [rateSettings, setRateSettings] = useState({
    lowerBoundRate: 1.0,
    upperBoundRate: 15.0,
    increment: 0.25
  });
  
  const {
    results,
    isLoading,
    progress,
    totalCalculations,
    error,
    calculateNpv
  } = useNpvStream();

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      initialInvestment,
      cashFlows,
      ...rateSettings
    };
    calculateNpv(request);
  };

  return (
    <Container data-testid="npv-calculator"  className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">NPV Calculator</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" >Initial Investment</Form.Label>
              <Form.Control
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                min="0"
                step="100"
                required
                data-testid="initial-investment-input"
              />
            </Form.Group>
            
            <CashFlowInput 
              cashFlows={cashFlows} 
              setCashFlows={setCashFlows} 
            />
            
            <RateSettings 
              values={rateSettings} 
              onChange={setRateSettings} 
            />
            
            <div className="d-grid mt-4">
              <Button 
                variant="primary" 
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Calculate NPV'}
              </Button>
            </div>
          </Form>
          
          <ProgressBar 
            progress={progress} 
            total={totalCalculations} 
            isLoading={isLoading} 
          />
          
          {results?.length > 0 && (
            <>
              <ResultsTable results={results} />
              <NpvChart results={results} />
            </>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Calculated {progress} of {totalCalculations} NPV values
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default NpvCalculator;