import { Hono } from 'hono';
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

export default app;
