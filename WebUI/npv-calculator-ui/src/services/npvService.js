import axios from 'axios';

const API_BASE_URL = 'http://localhost:5075/api'; // Update with your backend URL

export const calculateNpv = async (request) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/npv/stream`, request, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Calculation failed: ${error.response?.data?.message || error.message}`);
  }
};

export const streamNpvResults = (request, onData, onComplete, onError) => {
  const eventSource = new EventSource(
    `${API_BASE_URL}/npv/stream?` +
    `initialInvestment=${request.initialInvestment}&` +
    `cashFlows=${request.cashFlows.join(',')}&` +
    `lowerBoundRate=${request.lowerBoundRate}&` +
    `upperBoundRate=${request.upperBoundRate}&` +
    `increment=${request.increment}`
  );

  eventSource.onmessage = (event) => {
    console.log('Received data:', event.data);
    const data = JSON.parse(event.data);
    if (data.complete) {
      eventSource.close();
      onComplete();
    } else {
      onData(data);
    }
  };

  eventSource.onerror = (error) => {
    eventSource.close();
    onError(error);
  };

  return eventSource;
};