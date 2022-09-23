import { ConflictError } from '../../common/errors';
import { BadRequestError } from '../../common/errors/badRequest';
import { updateUserBalanceAndGetUserService } from '../user/updateBalance';
import { prisma } from './../../database/connection';
import { CreateTransactionDto } from './../../dto/transaction/create';

export const createTransactionService = async (input: CreateTransactionDto) => {
  if (input.toCreate.type === 'TRANSFER') {
    if (!input.receiverEmail) {
      throw new BadRequestError(
        'Receiver email is required to make a transfer'
      );
    }

    const user = await updateUserBalanceAndGetUserService(input.email);

    if (user.balance < input.toCreate.value) {
      throw new ConflictError('Balance insufficient to do this operation');
    }

    const transfer = await prisma.transaction.create({
      data: {
        ...input.toCreate,
        userEmail: input.email,
        receiverEmail: input.receiverEmail,
      },
    });

    return transfer;
  }

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
