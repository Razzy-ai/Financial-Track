import { z } from "zod";

//users
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

//budget
export const createBudgetSchema = z.object({
  userId: z.string().cuid(),
  category: z.string(),
  amount: z.number().positive(),
});

export const updateBudgetSchema = z.object({
  category: z.string().optional(),
  amount: z.number().positive().optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;


//category
export const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;


//trasanction
export const createTransactionSchema = z.object({
  title: z.string(),
  amount: z.number(),
  userId: z.string().cuid(),
  categoryId: z.string().cuid(),
  typeId: z.string().cuid(),
});

export const updateTransactionSchema = z.object({
  title: z.string().optional(),
  amount: z.number().optional(),
  categoryId: z.string().cuid().optional(),
  typeId: z.string().cuid().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;


//transactionType
export const createTransactionTypeSchema = z.object({
  name: z.string(),
});

export const updateTransactionTypeSchema = z.object({
  name: z.string(),
});

export type CreateTransactionTypeInput = z.infer<typeof createTransactionTypeSchema>;
export type UpdateTransactionTypeInput = z.infer<typeof updateTransactionTypeSchema>;


//userSettings
export const createUserSettingsSchema = z.object({
  userId: z.string().cuid(),
  currency: z.string(),
  timezone: z.string(),
  language: z.string(),
});

export const updateUserSettingsSchema = z.object({
  currency: z.string(),
  timezone: z.string(),
  language: z.string(),
});

export type createUserSettingsInput = z.infer<typeof createUserSettingsSchema>;
export type UpdateUserSettingsInput = z.infer<typeof updateUserSettingsSchema>;


//recurringTransaction
export const createRecurringTransactionSchema = z.object({
  userId: z.string().cuid(),
  amount: z.number().positive(),
  category: z.string(),
  frequency: z.string(),
  nextDate: z.string().datetime(),
});

export const updateRecurringTransactionSchema = z.object({
  amount: z.number().positive().optional(),
  category: z.string().optional(),
  frequency: z.string().optional(),
  nextDate: z.string().datetime().optional(),
});

export type CreateRecurringTransactionInput = z.infer<typeof createRecurringTransactionSchema>;
export type UpdateRecurringTransactionInput = z.infer<typeof updateRecurringTransactionSchema>;


//transactionTag
export const createTransactionTagSchema = z.object({
  name: z.string(),
});

export const updateTransactionTagSchema = z.object({
  name: z.string(),
});

export type CreateTransactionTagInput = z.infer<typeof createTransactionTagSchema>;
export type UpdateTransactionTagInput = z.infer<typeof updateTransactionTagSchema>;


//transactionNote
export const createTransactionNoteSchema = z.object({
  transactionId: z.string().cuid(),
  content: z.string(),
});

export const updateTransactionNoteSchema = z.object({
  content: z.string(),
});

export type CreateTransactionNoteInput = z.infer<typeof createTransactionNoteSchema>;
export type UpdateTransactionNoteInput = z.infer<typeof updateTransactionNoteSchema>;



// Schema for route param validation
export const userIdParamSchema = z.string().cuid();
export type userIdParamInput = z.infer<typeof userIdParamSchema>;
