import { Hono } from 'hono';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { categoriesRouter } from './routes/categories';
import { transactionsRouter } from './routes/transactions';
import { transactionTypesRouter } from './routes/transactionTypes';
import { transactionTagsRouter } from './routes/transactionTags';
import { transactionNotesRouter } from './routes/transactionNotes';
import { userSettingsRouter } from './routes/userSettings';
import { budgetRouter } from './routes/budgets';
import { cors } from 'hono/cors';
import { recurringTransactionsRouter } from './routes/recurringTransactions';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*', cors());

// Route prefix versioning like a real API
app.route('/api/v1/transactions', transactionsRouter);

app.route('api/v1/users', usersRouter); // For /users
app.route('/auth', authRouter);    // For /auth/login

app.route('api/v1/categories', categoriesRouter);

app.route('api/v1/transactionTypes', transactionTypesRouter);

app.route('api/v1/transactionTags', transactionTagsRouter);

app.route('api/v1/transactionNotes', transactionNotesRouter);

app.route('api/v1/userSettings', userSettingsRouter);

app.route('api/v1/budgets', budgetRouter);

app.route('api/v1/recurringTransactions', recurringTransactionsRouter);

export default app;
