import React from 'react';
import { render, screen } from '@testing-library/react';
import NpvChart from './NpvChart';

// Mock react-chartjs-2 to avoid chart rendering issues in tests
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-chart">MockChart</div>,
}));

describe('NpvChart Component', () => {
  test('renders nothing when no results', () => {
    const { container } = render(<NpvChart results={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders chart when results exist', () => {
    const mockResults = [
      { Rate: 1.0, NPV: 1000 },
      { Rate: 1.5, NPV: 1500 }
    ];
    
    render(<NpvChart results={mockResults} />);
    
    expect(screen.getByText('NPV Visualization')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  test('renders correct title', () => {
    const mockResults = [{ Rate: 1.0, NPV: 1000 }];
    render(<NpvChart results={mockResults} />);
    
    expect(screen.getByText('NPV Visualization')).toBeInTheDocument();
  });
});