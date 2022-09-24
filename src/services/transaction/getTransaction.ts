import { NotFoundError } from '../../common/errors';
import { prisma } from '../../database/connection';
import { GetUserTransactionDto } from '../../dto';

export const getUserTransactionService = async (
  input: GetUserTransactionDto
) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      OR: [
        { userEmail: input.email, id: input.transactionId },
        { receiverEmail: input.email, id: input.transactionId },
      ],
    },
  });

  if (!transaction) {
    throw new NotFoundError('Not find any transaction with sent email and id');
  }

  return transaction;
};
