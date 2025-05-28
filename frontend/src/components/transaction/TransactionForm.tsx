import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateTransactionInput } from "finance-common";
import { createTransactionSchema } from "finance-common";
import { createTransaction, updateTransaction } from "@/api/transactions";

type Props = {
  initialValues?: CreateTransactionInput;
  transactionId?: string;
  onSuccess?: () => void;
};

const TransactionForm: React.FC<Props> = ({ initialValues, transactionId, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: initialValues || {
      title: "",
      amount: 0,
      userId: "",
      categoryId: "",
      typeId: "",
    },
  });

  const onSubmit = async (data: CreateTransactionInput) => {
    try {
      if (transactionId) {
        await updateTransaction(transactionId, data);
      } else {
        await createTransaction(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Transaction save failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md">
      <div>
        <label className="block font-medium mb-1" htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title")}
          className="input"
          placeholder="Enter title"
        />
        {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
          className="input"
          placeholder="Enter amount"
        />
        {errors.amount && <p className="text-red-500 mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="userId">User ID</label>
        <input
          id="userId"
          {...register("userId")}
          className="input"
          placeholder="Enter user ID"
        />
        {errors.userId && <p className="text-red-500 mt-1">{errors.userId.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="categoryId">Category ID</label>
        <input
          id="categoryId"
          {...register("categoryId")}
          className="input"
          placeholder="Enter category ID"
        />
        {errors.categoryId && <p className="text-red-500 mt-1">{errors.categoryId.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1" htmlFor="typeId">Transaction Type ID</label>
        <input
          id="typeId"
          {...register("typeId")}
          className="input"
          placeholder="Enter transaction type ID"
        />
        {errors.typeId && <p className="text-red-500 mt-1">{errors.typeId.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {transactionId ? "Update" : "Create"} Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
