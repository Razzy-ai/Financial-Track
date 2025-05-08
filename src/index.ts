import { Hono } from 'hono';
import { transactionsRouter } from './routes/transactions';

const app = new Hono();

app.route('/transactions', transactionsRouter);

export default app;
