import { Router } from 'express';
import { CreateTransactionDto } from '../dto';
import { validateRequest } from '../middlewares/validateRequest';
import { validateToken } from '../middlewares/validateToken';
import transactionControllers from '../controllers/transaction';
import { GetUserTransactionsDto } from '../dto/transaction/get';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, CreateTransactionDto),
  transactionControllers.createTransaction
);

routes.get(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, GetUserTransactionsDto),
  transactionControllers.getUserTransactions
);

export default routes;
