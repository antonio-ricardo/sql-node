import { prisma } from './../../../database/connection';
import { ConflictError } from '../../../common/errors';
import { CreateTransactionDto } from '../../../dto';
import { updateUserBalanceAndGetUserService } from '../../user/updateBalance';

export const createBasicTransaction = async (input: CreateTransactionDto) => {
  if (input.toCreate.type === 'WITHDRAW') {
    const user = await updateUserBalanceAndGetUserService(input.email);

    if (user.balance < input.toCreate.value) {
      throw new ConflictError('Balance insufficient to do this operation');
    }
  }

  const transaction = await prisma.transaction.create({
    data: {
      ...input.toCreate,
      userEmail: input.email,
    },
  });

  return transaction;
};
