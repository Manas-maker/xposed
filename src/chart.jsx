import React from 'react';
import { BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const DataCharts = ({ data }) => {
  // Preparing the data for industry
  const industryData = data.BreachMetrics.industry[0].map((industry) => ({
    industry: industry[0], // industry code
    breaches: industry[1], // number of breaches
  }));

  console.log("Datas: ", industryData)
  return (
    <div>
      {/* Industry Bar Chart */}
      <h2>Breaches by Industry</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={industryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="industry" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="breaches" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataCharts;
