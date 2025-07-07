import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsTable from './ResultsTable';

describe('ResultsTable Component', () => {
  test('renders nothing when no results', () => {
    const { container } = render(<ResultsTable results={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders table with results', () => {
    const mockResults = [
      { Rate: 1.0, NPV: 1000 },
      { Rate: 1.5, NPV: 1500 }
    ];
    
    render(<ResultsTable results={mockResults} />);
    
    expect(screen.getByText('NPV Results')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Check headers
    expect(screen.getByText('Discount Rate')).toBeInTheDocument();
    expect(screen.getByText('NPV Value')).toBeInTheDocument();
    
    // Check data
    expect(screen.getByText('1.00%')).toBeInTheDocument();
    expect(screen.getByText('€1,000.00')).toBeInTheDocument();
    expect(screen.getByText('1.50%')).toBeInTheDocument();
    expect(screen.getByText('€1,500.00')).toBeInTheDocument();
  });


});