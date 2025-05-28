import React from "react";

type Props = {
  category: string;
  amount: number;
  currency?: string;
  onClick?: () => void;
};

const BudgetCard: React.FC<Props> = ({ category, amount, currency = "₹", onClick }) => {
  return (
    <div
      className="rounded-2xl bg-white shadow-md p-4 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{category}</h3>
      <p className="text-2xl font-bold text-blue-600">
        {currency}{amount.toLocaleString()}
      </p>
    </div>
  );
};

export default BudgetCard;
