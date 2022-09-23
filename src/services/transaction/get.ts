import { prisma } from './../../database/connection';
import { GetUserTransactionsDto } from '../../dto/transaction/get';

export const getUserTransactionsService = async (
  input: GetUserTransactionsDto
) => {
  if (input.type) {
    return await prisma.transaction.findMany({
      where: {
        OR: [
          { userEmail: input.email, type: input.type },
          { receiverEmail: input.email, type: input.type },
        ],
      },
    });
  }

  return await prisma.transaction.findMany({
    where: {
      OR: [{ userEmail: input.email }, { receiverEmail: input.email }],
    },
  });
};