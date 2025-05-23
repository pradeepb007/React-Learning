
const lineData = {
  '01/02/2024': { value: 1200 },
  '08/02/2024': { value: 2400, bold: true },
  // ...
};

const barData = {
  '15/03/2025': { value: 2600 },
  '22/03/2025': { value: 3000, bold: true },
  // ...
};
const combinedDates = new Set([
  ...Object.keys(lineData),
  ...Object.keys(barData),
]);

const mergedData = Array.from(combinedDates).map(date => ({
  name: date,
  lineValue: lineData[date]?.value,
  barValue: barData[date]?.value,
  bold: lineData[date]?.bold || barData[date]?.bold || false,
}));


const barData = {
  '15/03/2025': { value: 2600, alert: true },
  '22/03/2025': { value: 3000, alert: false },
};


const mergedData = Array.from(combinedDates).map(date => ({
  name: date,
  lineValue: lineData[date]?.value,
  barValue: barData[date]?.value,
  bold: lineData[date]?.bold || barData[date]?.bold || false,
  alert: barData[date]?.alert || false,
}));




import {
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';
<ResponsiveContainer width="100%" height={400}>
  <ComposedChart data={mergedData}>
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis
      dataKey="name"
      angle={-45}
      textAnchor="end"
      height={80}
      tick={({ x, y, payload }) => {
        const entry = mergedData.find(d => d.name === payload.value);
        const isBold = entry?.bold;
        return (
          <text
            x={x}
            y={y + 15}
            textAnchor="end"
            transform={`rotate(-45, ${x}, ${y})`}
            fontWeight={isBold ? 'bold' : 'normal'}
            fontSize={12}
          >
            {payload.value}
          </text>
        );
      }}
    />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="lineValue"
      stroke="#8884d8"
      name="Forecasted Shipments"
      dot={{ r: 2 }}
    />
    <Bar dataKey="barValue" barSize={20} name="Event Weeks">
      {mergedData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.alert ? '#f44336' : '#82ca9d'} // red if alert, else green
        />
      ))}
    </Bar>
  </ComposedChart>
</ResponsiveContainer>


import { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: '10px',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
        }}
      >
        <div><strong>{label}</strong></div>
        {payload.map((entry, i) => (
          <div key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

import { TooltipProps } from 'recharts';

<ResponsiveContainer width="100%" height={400}>
  <ComposedChart data={mergedData}>
    <CartesianGrid stroke="#eee" />
    <XAxis
      dataKey="name"
      angle={-45}
      textAnchor="end"
      height={70}
      tick={({ x, y, payload }) => {
        const entry = mergedData.find(d => d.name === payload.value);
        return (
          <text
            x={x}
            y={y + 15}
            textAnchor="end"
            transform={`rotate(-45, ${x}, ${y})`}
            fontWeight={entry?.bold ? 'bold' : 'normal'}
            fontSize={12}
          >
            {payload.value}
          </text>
        );
      }}
    />
    <YAxis />   
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    <Line
      type="monotone"
      dataKey="lineValue"
      stroke="#1976d2"
      name="Forecasted Shipments"
      dot={{ r: 2 }}
    />
    <Bar dataKey="barValue" barSize={20} name="Event Weeks">
      {mergedData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.alert ? '#d32f2f' : '#388e3c'}
        />
      ))}
    </Bar>
    <ReferenceLine
      x="15/03/2025" stroke="#9e9e9e" strokeDasharray="3 3"
      label={{ value: '← Event Phase', position: 'top', fill: '#616161' }}
    />
  </ComposedChart>
</ResponsiveContainer>



