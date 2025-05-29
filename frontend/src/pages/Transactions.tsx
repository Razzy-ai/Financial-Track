import { useEffect, useState } from "react";
import TransactionForm from "@/components/transaction/TransactionForm";
import type { CreateTransactionInput } from "finance-common";
import { getTransactions } from "@/api/transactions";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<CreateTransactionInput[]>([]);

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <TransactionForm onSuccess={() => console.log("Added")} />

      <ul className="space-y-3 mt-6">
        {transactions.map((tx, idx) => (
          <li key={idx} className="border p-4 rounded shadow">
            <p><strong>Title:</strong> {tx.title}</p>
            <p><strong>Amount:</strong> ₹{tx.amount}</p>
            <p><strong>Category ID:</strong> {tx.categoryId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
