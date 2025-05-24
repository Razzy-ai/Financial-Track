import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createUserSettingsSchema, updateUserSettingsSchema , userIdParamSchema } from 'finance-common';


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

  const parsed = userIdParamSchema.safeParse(userId);
  if (!parsed.success) {
    return c.json({ error: 'Invalid userId', details: parsed.error.flatten() }, 400);
  }

  try {
    const settings = await prisma.userSettings.findUnique({ where: { userId:parsed.data } });
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
  
  const parsed = createUserSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation error', details: parsed.error.flatten() }, 400);
  }

  try {
    const settings = await prisma.userSettings.create({
      data: {
        userId: parsed.data.userId,
        currency: parsed.data.currency,
        timezone: parsed.data.timezone,
        language: parsed.data.language,
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
  const paramParsed = userIdParamSchema.safeParse(userId);

  const existing = await prisma.transactionType.findUnique({ where: { id: paramParsed.data } });
    if (!existing) return c.json({ error: 'Transaction type not found' }, 404);

  
  const bodyparsed = updateUserSettingsSchema.safeParse(body);
  if (!bodyparsed.success) {
    return c.json({ error: 'Validation error', details: bodyparsed.error.flatten() }, 400);
  }
  
  if (!paramParsed.success) {
    return c.json({ error: 'Invalid userId', details: paramParsed.error.flatten() }, 400);
  }

  try {
    const settings = await prisma.userSettings.update({
      where: { userId:paramParsed.data },
      data: {
        currency: bodyparsed.data.currency,
        timezone: bodyparsed.data.timezone,
        language: bodyparsed.data.language,
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

   const parsed = userIdParamSchema.safeParse(userId);
   
   const existing = await prisma.transactionType.findUnique({ where: { id: parsed.data } });
     if (!existing) return c.json({ error: 'Transaction type not found' }, 404);


  if (!parsed.success) {
    return c.json({ error: 'Invalid userId', details: parsed.error.flatten() }, 400);
  }

  try {
    await prisma.userSettings.delete({ where: { userId:parsed.data } });
    return c.json({ message: 'User settings deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: String(error) }, 500);
  }
});
