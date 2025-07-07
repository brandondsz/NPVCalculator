import React from 'react';
import { Table } from 'react-bootstrap';

const ResultsTable = ({ results }) => {
  if (!results.length) return null;

  return (
    <div className="mt-4">
      <h5 className="mb-3 fw-bold">NPV Results</h5>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Discount Rate</th>
              <th>NPV Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.Rate?.toFixed(2)}%</td>
                <td className="fw-semibold">
                  {result.NPV?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsTable;