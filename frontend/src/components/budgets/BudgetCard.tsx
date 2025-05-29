import React from "react";

type Props = {
  category: string;
  amount: number;
  currency?: string;
  onClick?: () => void;
};

const BudgetCard: React.FC<Props> = ({ category, amount, currency = "INR", onClick }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={`View budget for ${category}`}
      className="rounded-2xl bg-white shadow-md p-4 hover:shadow-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <h3 className="text-lg font-semibold mb-2">{category}</h3>
      <p className="text-2xl font-bold text-blue-600">{formattedAmount}</p>
    </div>
  );
};

export default BudgetCard;
