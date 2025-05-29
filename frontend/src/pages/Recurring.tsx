import { useEffect, useState } from "react";
import { getRecurringTransactions } from "@/api/recurring";
import type { CreateRecurringTransactionInput } from "finance-common";

const RecurringPage = () => {
  const [recurring, setRecurring] = useState<CreateRecurringTransactionInput[]>([]);

  useEffect(() => {
    getRecurringTransactions()
      .then(setRecurring)
      .catch((err) => console.error("Failed to fetch recurring transactions", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Recurring Transactions</h1>
      <ul className="space-y-3">
        {recurring.map((tx, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <p><strong>Amount:</strong> ₹{tx.amount}</p>
            <p><strong>Category:</strong> {tx.category}</p>
            <p><strong>Frequency:</strong> {tx.frequency}</p>
            <p><strong>Next Date:</strong> {new Date(tx.nextDate).toLocaleDateString()}</p>
            <p><strong>User ID:</strong> {tx.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringPage;
