import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  test('renders nothing when not loading', () => {
    const { container } = render(
      <ProgressBar progress={0} total={0} isLoading={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders nothing when total is 0', () => {
    const { container } = render(
      <ProgressBar progress={0} total={0} isLoading={true} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders progress bar when loading', () => {
    render(
      <ProgressBar progress={3} total={10} isLoading={true} />
    );
    
    expect(screen.getByText('Calculating NPVs...')).toBeInTheDocument();
    expect(screen.getByText('3 / 10 (30%)')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows correct percentage in bar', () => {
    render(
      <ProgressBar progress={7} total={10} isLoading={true} />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 70%');
    expect(progressBar).toHaveTextContent('70%');
  });

  test('shows 100% when complete', () => {
    render(
      <ProgressBar progress={10} total={10} isLoading={true} />
    );
    
    expect(screen.getByText('10 / 10 (100%)')).toBeInTheDocument();
  });
});