import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createTransactionTypeSchema,updateTransactionTypeSchema, userIdParamSchema } from 'finance-common';

export const transactionTypesRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();


// GET all transaction types
transactionTypesRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const types = await prisma.transactionType.findMany();
    return c.json(types);
  } catch (error) {
    console.error('❌ GET /transaction-types error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// POST a new transaction type
transactionTypesRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const bodyparsed = createTransactionTypeSchema.safeParse(body);
   if (!bodyparsed.success) {
     return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
   }

  try {
    const type = await prisma.transactionType.create({
      data: {
        name: bodyparsed.data.name,
      },
    });
    return c.json(type);
  } catch (error) {
    console.error('❌ POST /transaction-types error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// PUT update a transaction type
transactionTypesRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
   const paramParsed = userIdParamSchema.safeParse(id);

   const existing = await prisma.transactionType.findUnique({ where: { id: paramParsed.data } });
     if (!existing) return c.json({ error: 'Transaction type not found' }, 404);


  if (!paramParsed.success) {
    return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
  }
 
  const body = await c.req.json();
  const bodyparsed = updateTransactionTypeSchema.safeParse(body);
   if (!bodyparsed.success) {
     return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
   }

  try {
    const updatedType = await prisma.transactionType.update({
      where: { id:paramParsed.data },
      data: {
        name: bodyparsed.data.name,
      },
    });
    return c.json(updatedType);
  } catch (error) {
    console.error(`❌ PUT /transaction-types/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE a transaction type
transactionTypesRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);

  const existing = await prisma.transactionType.findUnique({ where: { id: paramParsed.data } });
   if (!existing) return c.json({ error: 'Transaction type not found' }, 404);


  if (!paramParsed.success) {
    return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
  }

  try {
    const deleted = await prisma.transactionType.delete({
      where: { id:paramParsed.data },
    });
    return c.json(deleted);
  } catch (error) {
    console.error(`❌ DELETE /transaction-types/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
