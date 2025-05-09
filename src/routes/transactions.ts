import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const transactionsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

transactionsRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const transactions = await prisma.transaction.findMany();
    return c.json(transactions);
  } catch (error) {
    console.error('❌ GET /transactions error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

transactionsRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const transaction = await prisma.transaction.create({
      data: {
        title: body.title,
        amount: body.amount,
        category: body.category,
      },
    });
    return c.json(transaction);
  } catch (error) {
    console.error('❌ POST /transactions error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
