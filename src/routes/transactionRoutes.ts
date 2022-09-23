import { Router } from 'express';
import { BaseDto, CreateTransactionDto, GetUserTransactionsDto } from '../dto';
import { validateRequest } from '../middlewares/validateRequest';
import { validateToken } from '../middlewares/validateToken';
import transactionControllers from '../controllers/transaction';

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

routes.get(
  '/balance',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, BaseDto),
  transactionControllers.getBalance
);

export default routes;
