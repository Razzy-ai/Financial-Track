import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBudgetSchema , updateBudgetSchema , userIdParamSchema } from 'finance-common';

export const budgetRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create a new budget
budgetRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const body = await c.req.json();
  const bodyparsed = createBudgetSchema.safeParse(body);
             if (!bodyparsed.success) {
               return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
             }

  try {
    const budget = await prisma.budget.create({
      data: {
        userId: bodyparsed.data.userId,
        category: bodyparsed.data.category,
        amount: bodyparsed.data.amount,
      },
    });
    return c.json(budget);
  } catch (error) {
    console.error('❌ POST /budget error:', error);
    return c.json({ error: 'Budget creation failed', details: String(error) }, 500);
  }
});

// Get all budgets
budgetRouter.get('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  try {
    const budgets = await prisma.budget.findMany();
    return c.json(budgets);
  } catch (error) {
    console.error('❌ GET /budget error:', error);
    return c.json({ error: 'Fetching budgets failed', details: String(error) }, 500);
  }
});

// Update budget by ID
budgetRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const id = c.req.param('id');
   const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  const body = await c.req.json();
  const bodyparsed = updateBudgetSchema.safeParse(body);
         if (!bodyparsed.success) {
           return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
         }

  try {
    const updated = await prisma.budget.update({
      where: { id:paramParsed.data },
      data: {
        category: bodyparsed.data.category,
        amount: bodyparsed.data.amount,
      },
    });
    return c.json(updated);
  } catch (error) {
    console.error('❌ PUT /budget/:id error:', error);
    return c.json({ error: 'Budget update failed', details: String(error) }, 500);
  }
});

// Delete budget by ID
budgetRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  try {
    await prisma.budget.delete({ where: { id:paramParsed.data } });
    return c.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /budget/:id error:', error);
    return c.json({ error: 'Budget deletion failed', details: String(error) }, 500);
  }
});
