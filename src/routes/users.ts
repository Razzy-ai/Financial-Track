import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';
import { createUserSchema, updateUserSchema , userIdParamSchema} from 'finance-common';

export const usersRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();


// Create a new user
usersRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();

  const parseResult = createUserSchema.safeParse(body);
  if (!parseResult.success) {
    return c.json({ error: 'Validation error', details: parseResult.error.flatten() }, 400);
  }
   
  try {
    const hashedPassword = await bcrypt.hash(parseResult.data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parseResult.data.email,
        password: hashedPassword,
      },
    });

    const { password, ...safeUser } = user;
    return c.json(safeUser);
  } catch (error) {
    console.error('❌ POST /users error:', error);
    return c.json({ error: 'User creation failed', details: String(error) }, 500);
  }
});


// Get user by ID
usersRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
   
  const userId = c.req.param('id');
  const paramCheck = userIdParamSchema.safeParse(userId);
  if (!paramCheck.success) {
    return c.json({ error: 'Invalid user ID', details: paramCheck.error.flatten() }, 400);
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: paramCheck.data } });
    if (!user) return c.json({ error: 'User not found' }, 404);

    const { password, ...safeUser } = user;
    return c.json(safeUser);
  } catch (error) {
    console.error('❌ GET /users/:id error:', error);
    return c.json({ error: 'User fetch failed', details: String(error) }, 500);
  }
});

// Update user
usersRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId = c.req.param('id');
  const paramCheck = userIdParamSchema.safeParse(userId);
  const body = await c.req.json();

  if (!paramCheck.success) {
    return c.json({ error: 'Invalid user ID', details: paramCheck.error.flatten() }, 400);
  }

  const parseResult = updateUserSchema.safeParse(body);
  if (!parseResult.success) {
    return c.json({ error: 'Validation error', details: parseResult.error.flatten() }, 400);
  }

  try {
    let updatedData: { email?: string; password?: string } = {};

    if (parseResult.data.email) {
      updatedData.email = parseResult.data.email;
    }

    if (parseResult.data.password) {
      updatedData.password = await bcrypt.hash(parseResult.data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: paramCheck.data },
      data: updatedData,
    });

    const { password, ...safeUser } = user;
    return c.json(safeUser);
  } catch (error) {
    console.error('❌ PUT /users/:id error:', error);
    return c.json({ error: 'User update failed', details: String(error) }, 500);
  }
});

// Delete user
usersRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  
   const userId = c.req.param('id');
   const paramCheck = userIdParamSchema.safeParse(userId);
  if (!paramCheck.success) {
    return c.json({ error: 'Invalid user ID', details: paramCheck.error.flatten() }, 400);
  }

  try {
    await prisma.user.delete({ where: { id: paramCheck.data } });
    return c.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /users/:id error:', error);
    return c.json({ error: 'User deletion failed', details: String(error) }, 500);
  }
});
