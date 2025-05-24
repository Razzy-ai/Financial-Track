import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createTransactionNoteSchema , updateTransactionNoteSchema , userIdParamSchema } from 'finance-common';

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

  const body = await c.req.json();
  const bodyparsed = createTransactionNoteSchema.safeParse(body);
       if (!bodyparsed.success) {
         return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
       }

  try {
    const note = await prisma.transactionNote.create({
      data: {
        content: bodyparsed.data.content,
        transactionId: bodyparsed.data.transactionId,
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
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  const body = await c.req.json();
  const bodyparsed = updateTransactionNoteSchema.safeParse(body);
       if (!bodyparsed.success) {
         return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
       }

  try {
    const updatedNote = await prisma.transactionNote.update({
      where: { id:paramParsed.data },
      data: {
        content: bodyparsed.data.content,
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
  const paramParsed = userIdParamSchema.safeParse(id);
     if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  try {
    const deleted = await prisma.transactionNote.delete({
      where: { id:paramParsed.data },
    });
    return c.json(deleted);
  } catch (error) {
    console.error(`❌ DELETE /transaction-notes/${id} error:`, error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
