import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const categoriesRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Initialize Prisma
const getPrisma = (url: string) =>
  new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());

// GET /categories - Fetch all categories
categoriesRouter.get('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const categories = await prisma.category.findMany();
    return c.json(categories);
  } catch (error) {
    console.error('❌ GET /categories error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

// POST /categories - Create a new category
categoriesRouter.post('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description || null,
      },
    });
    return c.json(category);
  } catch (error) {
    console.error('❌ POST /categories error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// PUT /categories/:id - Update a category
categoriesRouter.put('/:id', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description || null,
      },
    });
    return c.json(category);
  } catch (error) {
    console.error('❌ PUT /categories/:id error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE /categories/:id - Delete a category
categoriesRouter.delete('/:id', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param('id');
  try {
    await prisma.category.delete({
      where: { id },
    });
    return c.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('❌ DELETE /categories/:id error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
