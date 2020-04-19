import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoriesRouter from './categories.router';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
