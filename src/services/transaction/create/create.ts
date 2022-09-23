import { CreateTransactionDto } from '../../../dto/transaction/create';
import { createBasicTransaction } from './basic';
import { createTransferTransaction } from './transfer';

export const createTransactionService = async (input: CreateTransactionDto) => {
  if (input.toCreate.type === 'TRANSFER') {
    return await createTransferTransaction(input);
  }

  return await createBasicTransaction(input);
};
