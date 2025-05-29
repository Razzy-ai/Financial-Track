import React from "react";
import type { Transaction, Category, TransactionType } from "@/types";

type TransactionListProps = {
  transactions: Transaction[];
  categories: Category[];
  transactionTypes: TransactionType[];
  onDelete: (id: string) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categories,
  transactionTypes,
  onDelete,
}) => {
  const getCategoryName = (categoryId: string) =>
    categories.find((cat) => cat.id === categoryId)?.name || "Unknown";

  const getTypeName = (typeId: string) =>
    transactionTypes.find((type) => type.id === typeId)?.name || "Unknown";

  return (
    <table className="transaction-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan={5}>No transactions found.</td>
          </tr>
        ) : (
          transactions.map(({ id, title, amount, categoryId, typeId }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{amount.toFixed(2)}</td>
              <td>{getCategoryName(categoryId)}</td>
              <td>{getTypeName(typeId)}</td>
              <td>
                <button onClick={() => onDelete(id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TransactionList;
