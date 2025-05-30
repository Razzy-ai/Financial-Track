import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CreateBudgetInput } from "finance-common";
import { createBudgetSchema } from "finance-common";
import { createBudget } from "../../api/budgets";
import { toast } from "sonner"; 

interface BudgetFormProps {
  userId: string;
  onSuccess?: () => void;
}

const BudgetForm = ({ userId, onSuccess }: BudgetFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBudgetInput>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      category: "",
      amount: 0,
      userId,
    },
  });

  const onSubmit = async (data: CreateBudgetInput) => {
    setLoading(true);
    try {
      await createBudget(data);
      reset();
      onSuccess?.();
       toast.success("Budget created successfully.");
    } catch (error) {
      console.error("Error creating budget:", error);
       toast.error("Failed to create budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <input
          id="category"
          {...register("category")}
          disabled={loading}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Groceries"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          disabled={loading}
          {...register("amount", { valueAsNumber: true })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 2000"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <input type="hidden" value={userId} {...register("userId")} />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;
