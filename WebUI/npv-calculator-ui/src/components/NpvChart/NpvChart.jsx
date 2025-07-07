import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NpvChart = ({ results }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Cleanup previous chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!results.length) return null;

  const data = {
    labels: results.map(r => `${r.Rate.toFixed(2)}%`),
    datasets: [
      {
        label: 'Net Present Value (NPV)',
        data: results.map(r => r.NPV),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(75, 192, 192)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'NPV vs Discount Rate'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `NPV: ${context.parsed.y.toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR'
            })}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Discount Rate (%)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Net Present Value (NPV)'
        },
        ticks: {
          callback: (value) => {
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR'
            });
          }
        }
      }
    }
  };

  return (
    <div className="mt-4" style={{ height: '400px' }}>
      <h5 className="mb-3 fw-bold">NPV Visualization</h5>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default NpvChart;