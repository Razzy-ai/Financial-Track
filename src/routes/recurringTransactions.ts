import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createRecurringTransactionSchema,updateRecurringTransactionSchema,userIdParamSchema } from 'finance-common';

export const recurringTransactionsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create
recurringTransactionsRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();
  const bodyparsed = createRecurringTransactionSchema.safeParse(body);
         if (!bodyparsed.success) {
           return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
         }
  try {
    const rt = await prisma.recurringTransaction.create({
      data: {
        userId: bodyparsed.data.userId,
        amount: bodyparsed.data.amount,
        category: bodyparsed.data.category,
        frequency: bodyparsed.data.frequency,
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
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  try {
    const rt = await prisma.recurringTransaction.findUnique({ where: { id:paramParsed.data } });
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
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  const body = await c.req.json();
  const bodyparsed = updateRecurringTransactionSchema.safeParse(body);
         if (!bodyparsed.success) {
           return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
         }

  try {
    const rt = await prisma.recurringTransaction.update({
      where: { id:paramParsed.data },
      data: {
        amount: bodyparsed.data.amount,
        category: bodyparsed.data.category,
        frequency: bodyparsed.data.frequency,
        nextDate: bodyparsed.data.nextDate ? new Date(bodyparsed.data.nextDate) : undefined
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
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  try {
    await prisma.recurringTransaction.delete({ where: { id:paramParsed.data } });
    return c.json({ message: 'Recurring transaction deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete recurring transaction', details: String(error) }, 500);
  }
});
