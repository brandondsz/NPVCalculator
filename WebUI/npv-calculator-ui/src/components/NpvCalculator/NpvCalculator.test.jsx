import React from 'react';
import { render, screen } from '@testing-library/react';
import NpvCalculator from './NpvCalculator';


describe('NpvCalculator', () => {
    test('renders without crashing', () => {
        render(<NpvCalculator />);
        expect(screen.getByText('NPV Calculator')).toBeInTheDocument();
    });

    test('shows initial investment field', () => {
        render(<NpvCalculator />);
        expect(screen.getByTestId('initial-investment-input')).toBeInTheDocument();
    });

    test('has calculate button', () => {
        render(<NpvCalculator />);
        expect(screen.getByRole('button', { name: 'Calculate NPV' })).toBeInTheDocument();
    });

});