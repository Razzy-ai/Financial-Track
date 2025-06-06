import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  month: string;
  amount: number;
};

type ChartProps = {
  data: DataPoint[];
  currency?: string;
};

const Chart: React.FC<ChartProps> = ({ data, currency = "₹" }) => {
  return (
    <section aria-label="Monthly Spending Chart" className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${currency}${value.toLocaleString()}`} />
          <Tooltip formatter={(value: number) => `${currency}${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
