
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const transactionNotesRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// GET all transaction notes
transactionNotesRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const notes = await prisma.transactionNote.findMany();
    return c.json(notes);
  } catch (error) {
    console.error('❌ GET /transaction-notes error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// POST a new transaction note
transactionNotesRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const note = await prisma.transactionNote.create({
      data: {
        content: body.content,
        transactionId: body.transactionId,
      },
    });
    return c.json(note);
  } catch (error) {
    console.error('❌ POST /transaction-notes error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// PUT update a transaction note
transactionNotesRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const updatedNote = await prisma.transactionNote.update({
      where: { id },
      data: {
        content: body.content,
      },
    });
    return c.json(updatedNote);
  } catch (error) {
    console.error(`❌ PUT /transaction-notes/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE a transaction note
transactionNotesRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  try {
    const deleted = await prisma.transactionNote.delete({
      where: { id },
    });
    return c.json(deleted);
  } catch (error) {
    console.error(`❌ DELETE /transaction-notes/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
