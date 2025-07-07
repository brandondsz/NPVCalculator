import { useState, useEffect } from 'react';
import { streamNpvResults } from '../services/npvService';

export function useNpvStream() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalCalculations, setTotalCalculations] = useState(0);
  const [error, setError] = useState(null);

  const calculateNpv = (request) => {
    setResults([]);
    setError(null);
    setIsLoading(true);
    
    // Calculate total number of rates
    const ratesCount = Math.floor(
      (request.upperBoundRate - request.lowerBoundRate) / request.increment
    ) + 1;
    setTotalCalculations(ratesCount);
    setProgress(0);

    return streamNpvResults(
      request,
      (data) => {
        setResults(prev => [...prev, data]);
        setProgress(prev => prev + 1);
      },
      () => setIsLoading(false),
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  return {
    results,
    isLoading,
    progress,
    totalCalculations,
    error,
    calculateNpv
  };
}