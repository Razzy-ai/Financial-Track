import React from "react";

type SummaryItem = {
  category: string;
  amount: number;
};

type SummaryProps = {
  data: SummaryItem[];
  currency?: string;
};

const Summary: React.FC<SummaryProps> = ({ data, currency = "₹" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Category-wise Spending</h2>
      <ul>
        {data.map(({ category, amount }) => (
          <li
            key={category}
            className="flex justify-between border-b py-2 last:border-b-0"
          >
            <span>{category}</span>
            <span>
              {currency}
              {amount.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
