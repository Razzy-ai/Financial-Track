import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createTransactionSchema,updateTransactionSchema,userIdParamSchema } from 'finance-common';


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
  
    const body = await c.req.json();
    const bodyparsed = createTransactionSchema.safeParse(body);
    if (!bodyparsed.success) {
     return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
   }

  try {

    const transaction = await prisma.transaction.create({
      data: {
        title: bodyparsed.data.title,
        amount: bodyparsed.data.amount,
         user: { connect: { id: bodyparsed.data.userId } },
       category: { connect: { id: bodyparsed.data.categoryId } },
        transactionType: { connect: { id: bodyparsed.data.typeId } },
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


  const id = c.req.param('id');
     const paramParsed = userIdParamSchema.safeParse(id);
    if (!paramParsed.success) {
      return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
    }
   
    const body = await c.req.json();
    const bodyparsed = updateTransactionSchema.safeParse(body);
     if (!bodyparsed.success) {
       return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
     }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: paramParsed.data },
      data: {
        title: bodyparsed.data.title,
        amount: bodyparsed.data.amount,
        categoryId: bodyparsed.data.categoryId,  
        typeId: bodyparsed.data.typeId,  
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

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);
  if (!paramParsed.success) {
    return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
  }

  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id:paramParsed.data},
    });

    return c.json(deletedTransaction);
  } catch (error) {
    console.error(`❌ DELETE /transactions/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});