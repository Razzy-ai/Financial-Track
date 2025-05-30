import { useEffect, useState } from "react";
import TransactionForm from "../components/transaction/TransactionForm";
import { getTransactions } from "../api/transactions";
import { getCategories } from "../api/categories";
import { getTransactionTypes } from "../api/transactionTypes";

import type { Transaction, Category, TransactionType } from "@/types";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getTransactions(),
      getCategories(),
      getTransactionTypes(),
    ])
      .then(([txs, cats, types]) => {
        setTransactions(txs);
        setCategories(cats);
        setTransactionTypes(types);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = () => {
    getTransactions().then(setTransactions);
  };

  if (loading) return <div className="p-6">Loading transactions...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <TransactionForm
        onSuccess={handleSuccess}
        categories={categories}
        transactionTypes={transactionTypes}
      />

      <ul className="space-y-3 mt-6">
        {transactions.map((tx) => (
          <li key={tx.id} className="border p-4 rounded shadow">
            <p><strong>Title:</strong> {tx.title}</p>
            <p><strong>Amount:</strong> ₹{tx.amount}</p>
            <p><strong>Category:</strong> {categories.find(c => c.id === tx.categoryId)?.name || tx.categoryId}</p>
            <p><strong>Type:</strong> {transactionTypes.find(t => t.id === tx.transactionTypeId)?.name || tx.transactionTypeId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
