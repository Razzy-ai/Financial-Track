import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRouter.post('/login', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();
  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    const { password: _, ...safeUser } = user;

    return c.json({ token, user: safeUser });
  } catch (err) {
    console.error('❌ POST /login error:', err);
    return c.json({ error: 'Login failed', details: String(err) }, 500);
  }
});
