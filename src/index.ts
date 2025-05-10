import { Hono } from 'hono';
import { usersRouter } from './routes/users';
import { transactionsRouter } from './routes/transactions';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*', cors());

// Route prefix versioning like a real API
app.route('/api/v1/transactions', transactionsRouter);

app.route('api/v1/users', usersRouter);

export default app;
