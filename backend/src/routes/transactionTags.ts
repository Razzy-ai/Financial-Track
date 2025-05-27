import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createTransactionTagSchema,updateTransactionTagSchema,userIdParamSchema } from "finance-common";

export const transactionTagsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();



// GET all transaction tags
transactionTagsRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const tags = await prisma.transactionTag.findMany();
    return c.json(tags);
  } catch (error) {
    console.error('❌ GET /transaction-tags error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// POST a new transaction tag
transactionTagsRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const bodyparsed = createTransactionTagSchema.safeParse(body);
     if (!bodyparsed.success) {
       return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
     }

  try {
    const tag = await prisma.transactionTag.create({
      data: {
        name: bodyparsed.data.name,
      },
    });
    return c.json(tag);
  } catch (error) {
    console.error('❌ POST /transaction-tags error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// PUT update a transaction tag
transactionTagsRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);
   if (!paramParsed.success) {
     return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
   }

  const body = await c.req.json();
  const bodyparsed = updateTransactionTagSchema.safeParse(body);
     if (!bodyparsed.success) {
       return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
     }

  try {
    const updatedTag = await prisma.transactionTag.update({
      where: { id:paramParsed.data },
      data: {
        name: bodyparsed.data.name,
      },
    });
    return c.json(updatedTag);
  } catch (error) {
    console.error(`❌ PUT /transaction-tags/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE a transaction tag
transactionTagsRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);
  if (!paramParsed.success) {
    return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
  }

  try {
    const deleted = await prisma.transactionTag.delete({
      where: { id:paramParsed.data },
    });
    return c.json(deleted);
  } catch (error) {
    console.error(`❌ DELETE /transaction-tags/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
