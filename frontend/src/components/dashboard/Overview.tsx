import React from "react";

type OverviewProps = {
  totalBudgets: number;
  totalTransactions: number;
  totalAmount: number;
  currency?: string;
};

const Overview: React.FC<OverviewProps> = ({
  totalBudgets,
  totalTransactions,
  totalAmount,
  currency = "₹",
}) => {
  return (
    <div className="grid grid-cols-3 gap-6 p-4 bg-white rounded-lg shadow-md">
      <div className="text-center p-4 border rounded">
        <p className="text-gray-500">Total Budgets</p>
        <p className="text-3xl font-bold">{totalBudgets}</p>
      </div>
      <div className="text-center p-4 border rounded">
        <p className="text-gray-500">Total Transactions</p>
        <p className="text-3xl font-bold">{totalTransactions}</p>
      </div>
      <div className="text-center p-4 border rounded">
        <p className="text-gray-500">Total Amount Spent</p>
        <p className="text-3xl font-bold">
          {currency}
          {totalAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Overview;
