
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

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

  try {
    const body = await c.req.json();
    const tag = await prisma.transactionTag.create({
      data: {
        name: body.name,
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
  try {
    const body = await c.req.json();
    const updatedTag = await prisma.transactionTag.update({
      where: { id },
      data: {
        name: body.name,
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
  try {
    const deleted = await prisma.transactionTag.delete({
      where: { id },
    });
    return c.json(deleted);
  } catch (error) {
    console.error(`❌ DELETE /transaction-tags/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
