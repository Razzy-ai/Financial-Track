import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const budgetRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create a new budget
budgetRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();

  try {
    const budget = await prisma.budget.create({
      data: {
        userId: body.userId,
        category: body.category,
        amount: body.amount,
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
  const body = await c.req.json();

  try {
    const updated = await prisma.budget.update({
      where: { id },
      data: {
        category: body.category,
        amount: body.amount,
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

  try {
    await prisma.budget.delete({ where: { id } });
    return c.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /budget/:id error:', error);
    return c.json({ error: 'Budget deletion failed', details: String(error) }, 500);
  }
});
