import { prisma } from './../../database/connection';
import { CreateTransactionDto } from './../../dto/transaction/create';

export const createTransactionService = async (input: CreateTransactionDto) => {
  const transaction = await prisma.transaction.create({
    data: {
      ...input.toCreate,
      user: {
        connect: {
          email: input.email,
        },
      },
    },
  });

  return transaction;
};
