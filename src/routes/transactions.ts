import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const transactionsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// GET endpoint shows all the user expenses record
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

// POST endpoint -  Allows users to add a new expense
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
         user: { connect: { id: body.userId } },
       category: { connect: { id: body.categoryId } },
        transactionType: { connect: { id: body.typeId } },
      },
    });
    return c.json(transaction);
  } catch (error) {
    console.error('❌ POST /transactions error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});


//PUT endpoint - Enables users to update an existing transaction.
transactionsRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.req.param();
  const body = await c.req.json();

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: String(id) },
      data: {
        title: body.title,
        amount: body.amount,
        category: body.category,
      },
    });

    return c.json(updatedTransaction);
  } catch (error) {
    console.error(`❌ PUT /transactions/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE endpoint to delete a transaction
transactionsRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.req.param();

  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id: String(id) },
    });

    return c.json(deletedTransaction);
  } catch (error) {
    console.error(`❌ DELETE /transactions/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});