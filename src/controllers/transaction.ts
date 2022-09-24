import {
  BaseDto,
  CreateTransactionDto,
  GetUserTransactionDto,
  GetUserTransactionsDto,
} from './../dto';
import { BaseRequest } from '../common/baseRequest';
import { SuccessResponse } from '../common/successResponse';
import {
  createTransactionService,
  getUserTransactionService,
  getUserTransactionsService,
  updateUserBalanceAndGetUserService,
} from '../services';
import { Response } from 'express';

export default {
  async createTransaction(
    req: BaseRequest<CreateTransactionDto>,
    res: Response
  ) {
    const transaction = await createTransactionService(req.body);

    const { body, status } = SuccessResponse.create(transaction);

    return res.status(status).json(body);
  },

  async getUserTransactions(
    req: BaseRequest<GetUserTransactionsDto>,
    res: Response
  ) {
    const transactions = await getUserTransactionsService(req.body);

    const { body, status } = SuccessResponse.create(transactions);

    return res.status(status).json(body);
  },

  async getBalance(req: BaseRequest<BaseDto>, res: Response) {
    const user = await updateUserBalanceAndGetUserService(req.body.email);

    const { body, status } = SuccessResponse.create({ balance: user.balance });

    return res.status(status).json(body);
  },

  async getUserTransaction(
    req: BaseRequest<GetUserTransactionDto>,
    res: Response
  ) {
    const transaction = await getUserTransactionService(req.body);

    const { body, status } = SuccessResponse.create(transaction);

    return res.status(status).json(body);
  },
};
