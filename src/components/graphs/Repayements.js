import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Repayements = ({results}) => {

    return (
        <ResponsiveContainer width={700} height={300}>
        <BarChart
          data={results}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yearNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="paidThisYearTotal"  fill="#8884d8" />
          <Bar dataKey="paidThisYearInterest"  fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default Repayements