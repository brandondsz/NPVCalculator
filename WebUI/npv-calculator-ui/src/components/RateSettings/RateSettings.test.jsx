import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RateSettings from './RateSettings';

describe('RateSettings Component', () => {
  const mockValues = {
    lowerBoundRate: 1.0,
    upperBoundRate: 15.0,
    increment: 0.25
  };
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <RateSettings 
        values={mockValues} 
        onChange={mockOnChange} 
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders all input fields', () => {
    expect(screen.getByTestId('lower-bound-rate-input')).toBeInTheDocument();
    expect(screen.getByTestId('upper-bound-rate-input')).toBeInTheDocument();
    expect(screen.getByTestId('increment-input')).toBeInTheDocument();
  });

  test('displays initial values correctly', () => {
    expect(screen.getByTestId('lower-bound-rate-input')).toHaveValue(1.0);
    expect(screen.getByTestId('upper-bound-rate-input')).toHaveValue(15.0);
    expect(screen.getByTestId('increment-input')).toHaveValue(0.25);
  });

  test('calls onChange when lower bound changes', () => {
    const input = screen.getByTestId('lower-bound-rate-input');
    fireEvent.change(input, { target: { value: '2.5' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValues,
      lowerBoundRate: 2.5
    });
  });

  test('calls onChange when upper bound changes', () => {
    const input = screen.getByTestId('upper-bound-rate-input');
    fireEvent.change(input, { target: { value: '20.0' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValues,
      upperBoundRate: 20.0
    });
  });

  test('calls onChange when increment changes', () => {
    const input = screen.getByTestId('increment-input');
    fireEvent.change(input, { target: { value: '0.5' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValues,
      increment: 0.5
    });
  });
});