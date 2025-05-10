import { Hono } from 'hono';
import { usersRouter } from './routes/users';
import { categoriesRouter } from './routes/categories';
import { transactionsRouter } from './routes/transactions';
import { transactionTypesRouter } from './routes/transactionTypes';
import { transactionTagsRouter } from './routes/transactionTags';
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

app.route('api/v1/categories', categoriesRouter);

app.route('api/v1/transactionTypes', transactionTypesRouter);

app.route('api/v1/transactionTags', transactionTagsRouter);

export default app;
