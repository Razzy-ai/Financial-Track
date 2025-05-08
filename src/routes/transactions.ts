import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = new Hono();

router.get('/', async (c) => {
  const transactions = await prisma.transaction.findMany();
  return c.json(transactions);
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const transaction = await prisma.transaction.create({
    data: {
      title: body.title,
      amount: body.amount,
      category: body.category,
    },
  });
  return c.json(transaction);
});

export const transactionsRouter = router;
