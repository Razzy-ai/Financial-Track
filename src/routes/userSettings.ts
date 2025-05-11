import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const userSettingsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Initialize Prisma
const getPrisma = (url: string) =>
  new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());

// GET user settings by userId
userSettingsRouter.get('/:userId', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const userId = c.req.param('userId');

  try {
    const settings = await prisma.userSettings.findUnique({ where: { userId } });
    if (!settings) return c.json({ error: 'Settings not found' }, 404);
    return c.json(settings);
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// POST create user settings
userSettingsRouter.post('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();

  try {
    const settings = await prisma.userSettings.create({
      data: {
        userId: body.userId,
        currency: body.currency,
        timezone: body.timezone,
        language: body.language,
      },
    });
    return c.json(settings);
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// PUT update user settings
userSettingsRouter.put('/:userId', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const userId = c.req.param('userId');
  const body = await c.req.json();

  try {
    const settings = await prisma.userSettings.update({
      where: { userId },
      data: {
        currency: body.currency,
        timezone: body.timezone,
        language: body.language,
      },
    });
    return c.json(settings);
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});

// DELETE user settings
userSettingsRouter.delete('/:userId', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const userId = c.req.param('userId');

  try {
    await prisma.userSettings.delete({ where: { userId } });
    return c.json({ message: 'User settings deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
