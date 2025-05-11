import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const recurringTransactionsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create
recurringTransactionsRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const rt = await prisma.recurringTransaction.create({
      data: {
        userId: body.userId,
        amount: body.amount,
        category: body.category,
        frequency: body.frequency,
        nextDate: new Date(body.nextDate)
      },
    });
    return c.json(rt);
  } catch (error) {
    console.error('❌ POST /recurring-transactions error:', error);
    return c.json({ error: 'Failed to create recurring transaction', details: String(error) }, 500);
  }
});

// Read
recurringTransactionsRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const id = c.req.param('id');
  try {
    const rt = await prisma.recurringTransaction.findUnique({ where: { id } });
    if (!rt) return c.json({ error: 'Recurring transaction not found' }, 404);
    return c.json(rt);
  } catch (error) {
    return c.json({ error: 'Failed to fetch recurring transaction', details: String(error) }, 500);
  }
});

// Update
recurringTransactionsRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const id = c.req.param('id');
  const body = await c.req.json();
  try {
    const rt = await prisma.recurringTransaction.update({
      where: { id },
      data: {
        amount: body.amount,
        category: body.category,
        frequency: body.frequency,
        nextDate: new Date(body.nextDate)
      },
    });
    return c.json(rt);
  } catch (error) {
    return c.json({ error: 'Failed to update recurring transaction', details: String(error) }, 500);
  }
});

// Delete
recurringTransactionsRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const id = c.req.param('id');
  try {
    await prisma.recurringTransaction.delete({ where: { id } });
    return c.json({ message: 'Recurring transaction deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete recurring transaction', details: String(error) }, 500);
  }
});
