import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const usersRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create a new user
usersRouter.post('/', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // You should hash this in a real app!
      },
    });
    return c.json(user);
  } catch (error) {
    console.error('❌ POST /users error:', error);
    return c.json({ error: 'User creation failed', details: String(error) }, 500);
  }
});

// Get user by ID
usersRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId = c.req.param('id');

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json(user);
  } catch (error) {
    console.error('❌ GET /users/:id error:', error);
    return c.json({ error: 'User fetch failed', details: String(error) }, 500);
  }
});

// Update user
usersRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId = c.req.param('id');
  const body = await c.req.json();

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        email: body.email,
        password: body.password, // Again, hash in production
      },
    });
    return c.json(user);
  } catch (error) {
    console.error('❌ PUT /users/:id error:', error);
    return c.json({ error: 'User update failed', details: String(error) }, 500);
  }
});

// Delete user
usersRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId = c.req.param('id');

  try {
    await prisma.user.delete({ where: { id: userId } });
    return c.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /users/:id error:', error);
    return c.json({ error: 'User deletion failed', details: String(error) }, 500);
  }
});
