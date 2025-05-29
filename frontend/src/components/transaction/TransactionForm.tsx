import React, { useState } from "react";
import type { Category, TransactionType } from "@/types";

type TransactionFormProps = {
  categories: Category[];
  transactionTypes: TransactionType[];
  onSuccess: () => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  transactionTypes,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState("");
  const [typeId, setTypeId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !categoryId || !typeId) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          categoryId,
          typeId,
          // Include userId if necessary here or in backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      // Reset form
      setTitle("");
      setAmount("");
      setCategoryId("");
      setTypeId("");

      onSuccess();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          required
          min={0.01}
          step="0.01"
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Transaction Type:</label>
        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          {transactionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
