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
    <section aria-label="Category Spending Summary" className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Category-wise Spending</h2>
      <ul>
        {data.map(({ category, amount }, index) => (
          <li
            key={`${category}-${index}`}
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
    </section>
  );
};

export default Summary;
