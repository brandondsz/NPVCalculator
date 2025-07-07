import React from 'react';

const ProgressBar = ({ progress, total, isLoading }) => {
  if (!isLoading || total === 0) return null;
  
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div className="my-4">
      <div className="d-flex justify-content-between mb-1">
        <span>Calculating NPVs...</span>
        <span>{progress} / {total} ({percentage}%)</span>
      </div>
      <div className="progress" style={{ height: '20px' }}>
        <div 
          className="progress-bar progress-bar-striped progress-bar-animated" 
          role="progressbar" 
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;