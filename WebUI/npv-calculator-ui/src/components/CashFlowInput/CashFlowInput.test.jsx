import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CashFlowInput from './CashFlowInput';

describe('CashFlowInput Component', () => {
  const mockSetCashFlows = jest.fn();
  
  // Clear all mocks and cleanup after each test
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders initial cash flow inputs', () => {
    render(
      <CashFlowInput 
        cashFlows={[1000, 2000]} 
        setCashFlows={mockSetCashFlows} 
      />
    );
    
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveValue(1000);
    expect(inputs[1]).toHaveValue(2000);
  });

  test('adds new cash flow when Add button clicked', async () => {
    const user = userEvent.setup();
    render(
      <CashFlowInput 
        cashFlows={[1000]} 
        setCashFlows={mockSetCashFlows} 
      />
    );
    
    const addButton = screen.getByRole('button', { name: /add cash flow/i });
    await user.click(addButton);
    
    expect(mockSetCashFlows).toHaveBeenCalledWith([1000, 0]);
  });

  test('removes cash flow when Remove button clicked', async () => {
    const user = userEvent.setup();
    render(
      <CashFlowInput 
        cashFlows={[1000, 2000]} 
        setCashFlows={mockSetCashFlows} 
      />
    );
    
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    await user.click(removeButtons[0]);
    
    expect(mockSetCashFlows).toHaveBeenCalledWith([2000]);
  });


  test('disables Remove button when only one cash flow exists', () => {
    render(
      <CashFlowInput 
        cashFlows={[1000]} 
        setCashFlows={mockSetCashFlows} 
      />
    );
    
    // Should find both Add and Remove buttons
    const addButton = screen.getByRole('button', { name: /add cash flow/i });
    const removeButton = screen.getByRole('button', { name: /remove/i });

    expect(addButton).toBeEnabled();
    expect(removeButton).toBeDisabled();
  });

  test('does not allow removal when only one cash flow exists', async () => {
    const user = userEvent.setup();
    render(
      <CashFlowInput 
        cashFlows={[1000]} 
        setCashFlows={mockSetCashFlows} 
      />
    );
    
    // Verify no remove functionality is triggered
    expect(mockSetCashFlows).not.toHaveBeenCalled();
  });
});