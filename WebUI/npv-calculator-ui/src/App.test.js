import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {

  test('renders the NPV calculator component', () => {
    render(<App />);
    expect(screen.getByTestId('npv-calculator')).toBeInTheDocument();
  });
});