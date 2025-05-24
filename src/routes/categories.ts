import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createCategorySchema , updateCategorySchema , userIdParamSchema } from 'finance-common';

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
    const bodyparsed = createCategorySchema.safeParse(body);
           if (!bodyparsed.success) {
             return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
           }
    const category = await prisma.category.create({
      data: {
        name: bodyparsed.data.name,
        description: bodyparsed.data.description || null,
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

  const body = await c.req.json();
  const bodyparsed = updateCategorySchema.safeParse(body);
         if (!bodyparsed.success) {
           return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
         }

  const id = c.req.param('id');
  const paramParsed = userIdParamSchema.safeParse(id);
  if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }
  try {
    const category = await prisma.category.update({
      where: { id:paramParsed.data },
      data: {
        name: bodyparsed.data.name,
        description: bodyparsed.data.description || null,
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
   const paramParsed = userIdParamSchema.safeParse(id);
  if (!paramParsed.success) {
       return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
     }

  try {
    await prisma.category.delete({
      where: { id:paramParsed.data },
    });
    return c.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('❌ DELETE /categories/:id error:', error);
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
