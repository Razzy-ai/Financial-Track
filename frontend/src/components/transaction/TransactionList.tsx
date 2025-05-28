import { useEffect, useState } from "react";
import { getTransactions } from "@/api/transactions"; 
import type{ CreateTransactionInput } from "finance-common"; 

export default function TransactionList() {
  const [transactions, setTransactions] = useState<CreateTransactionInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); 
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li key={txn.title + txn.amount + txn.categoryId} className="bg-white p-4 rounded-lg shadow">
              <p className="text-lg font-semibold">{txn.title}</p>
              <p className="text-sm text-gray-600">Amount: ₹{txn.amount}</p>
              <p className="text-sm text-gray-500">Category: {txn.categoryId}</p>
              <p className="text-sm text-gray-500">Type ID: {txn.typeId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
